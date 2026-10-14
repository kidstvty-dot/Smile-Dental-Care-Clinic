import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface AdminAccount {
  name: string;
  email: string;
  passwordHash: string;
  registeredAt: string;
}

const LOCAL_STORAGE_KEY = 'sdc_single_master_admin_account';
const SESSION_STORAGE_KEY = 'sdc_admin_active_session';

// Simple SHA-256 hash using Web Crypto API
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks if the single admin account slot has already been claimed.
 */
export async function checkHasAdminRegistered(): Promise<boolean> {
  // 1. Check localStorage first
  const local = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (parsed && parsed.email) return true;
    } catch {
      // continue
    }
  }

  // 2. Check Firestore admin_meta/master_admin
  try {
    const snap = await getDoc(doc(db, 'admin_meta', 'master_admin'));
    if (snap.exists()) {
      const data = snap.data();
      if (data && data.email) {
        // Sync to localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return true;
      }
    }
  } catch (err) {
    console.warn('Firestore admin check notice:', err);
  }

  return false;
}

/**
 * Registers the ONLY admin account. If an account already exists, strictly rejects.
 */
export async function registerMasterAdmin(
  name: string,
  emailOrUsername: string,
  password: string
): Promise<{ success: boolean; error?: string; admin?: AdminAccount }> {
  const alreadyRegistered = await checkHasAdminRegistered();
  if (alreadyRegistered) {
    return {
      success: false,
      error:
        'The single admin account slot has already been claimed and registered. Nobody else is allowed to create an admin account.',
    };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const hash = await sha256(password);
  const adminAccount: AdminAccount = {
    name: name.trim(),
    email: emailOrUsername.trim().toLowerCase(),
    passwordHash: hash,
    registeredAt: new Date().toISOString(),
  };

  // 1. Save to localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(adminAccount));

  // 2. Save to Firestore
  try {
    await setDoc(doc(db, 'admin_meta', 'master_admin'), adminAccount);
  } catch (err) {
    console.warn('Firestore admin persistence note:', err);
  }

  // 3. Set active session
  sessionStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({ name: adminAccount.name, email: adminAccount.email })
  );

  return { success: true, admin: adminAccount };
}

/**
 * Log into the single master admin account.
 */
export async function loginAdmin(
  emailOrUsername: string,
  password: string
): Promise<{ success: boolean; error?: string; admin?: { name: string; email: string } }> {
  let storedAccount: AdminAccount | null = null;

  // 1. Try local storage
  const local = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (local) {
    try {
      storedAccount = JSON.parse(local);
    } catch {
      //
    }
  }

  // 2. Try Firestore if not in local
  if (!storedAccount) {
    try {
      const snap = await getDoc(doc(db, 'admin_meta', 'master_admin'));
      if (snap.exists()) {
        storedAccount = snap.data() as AdminAccount;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedAccount));
      }
    } catch (err) {
      console.warn('Firestore admin login fetch note:', err);
    }
  }

  if (!storedAccount) {
    return {
      success: false,
      error: 'No admin account found. Please use the single registration slot first.',
    };
  }

  const inputHash = await sha256(password);
  const cleanInputUser = emailOrUsername.trim().toLowerCase();

  const isUserMatch =
    storedAccount.email.toLowerCase() === cleanInputUser ||
    storedAccount.name.toLowerCase() === cleanInputUser;

  if (!isUserMatch || storedAccount.passwordHash !== inputHash) {
    return { success: false, error: 'Invalid username/email or password.' };
  }

  const sessionData = { name: storedAccount.name, email: storedAccount.email };
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

  return { success: true, admin: sessionData };
}

/**
 * Check if the user currently has an active logged in session
 */
export function getActiveAdminSession(): { name: string; email: string } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Log out
 */
export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
