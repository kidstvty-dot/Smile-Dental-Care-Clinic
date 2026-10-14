import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDocFromServer,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore with the provisioned database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Connection test on application boot as required
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

testConnection();

export interface FirebaseAppointment {
  id?: string;
  patientName: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface FirebaseInquiry {
  id?: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
}

// Appointment Firestore operations
export async function createAppointmentInFirebase(
  appointment: Omit<FirebaseAppointment, 'id' | 'status' | 'createdAt'> & {
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
  }
): Promise<string> {
  const docRef = await addDoc(collection(db, 'appointments'), {
    patientName: appointment.patientName.trim(),
    phone: appointment.phone.trim(),
    service: appointment.service,
    preferredDate: appointment.preferredDate || 'Earliest available',
    preferredTime: appointment.preferredTime || 'Morning (10:00 AM – 1:00 PM)',
    notes: appointment.notes?.trim() || '',
    status: appointment.status || 'pending',
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function fetchAppointmentsFromFirebase(): Promise<FirebaseAppointment[]> {
  try {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<FirebaseAppointment, 'id'>),
    }));
  } catch {
    // Fallback if query without index fails
    const snapshot = await getDocs(collection(db, 'appointments'));
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<FirebaseAppointment, 'id'>),
    }));
  }
}

export async function updateAppointmentStatusInFirebase(
  id: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<void> {
  const docRef = doc(db, 'appointments', id);
  await updateDoc(docRef, { status });
}

export async function deleteAppointmentInFirebase(id: string): Promise<void> {
  const docRef = doc(db, 'appointments', id);
  await deleteDoc(docRef);
}

// Contact Inquiry operations
export async function createInquiryInFirebase(inquiry: {
  name: string;
  phone: string;
  message: string;
}): Promise<string> {
  const docRef = await addDoc(collection(db, 'inquiries'), {
    name: inquiry.name.trim(),
    phone: inquiry.phone.trim(),
    message: inquiry.message.trim(),
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}
