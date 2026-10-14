import React, { useState, useEffect, useMemo } from 'react';
import {
  fetchAppointmentsFromFirebase,
  updateAppointmentStatusInFirebase,
  deleteAppointmentInFirebase,
} from '../firebase';
import {
  fetchAppointmentsFromSupabase,
  updateAppointmentStatusInSupabase,
  deleteAppointmentFromSupabase,
} from '../supabase';
import {
  checkHasAdminRegistered,
  registerMasterAdmin,
  loginAdmin,
  getActiveAdminSession,
  logoutAdmin,
} from '../adminAuth';
import {
  X,
  Lock,
  Calendar,
  Phone,
  MessageCircle,
  RefreshCw,
  Trash2,
  AlertCircle,
  Database,
  Code,
  UserPlus,
  LogIn,
  LogOut,
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UnifiedAppointment {
  id: string;
  source: 'supabase' | 'firestore';
  patientName: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Auth state
  const [hasRegistered, setHasRegistered] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('login');

  // Form inputs
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Appointments Dashboard state
  const [appointments, setAppointments] = useState<UnifiedAppointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [backendFilter, setBackendFilter] = useState<'all' | 'supabase' | 'firestore'>('all');
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  // Check registration and active session on modal open
  useEffect(() => {
    if (isOpen) {
      checkInitialAuthState();
    }
  }, [isOpen]);

  const checkInitialAuthState = async () => {
    setAuthLoading(true);
    setAuthError('');

    // Check active session
    const session = getActiveAdminSession();
    if (session) {
      setCurrentUser(session);
      setHasRegistered(true);
      loadAppointments();
    } else {
      const isRegistered = await checkHasAdminRegistered();
      setHasRegistered(isRegistered);
      if (!isRegistered) {
        setAuthMode('signup');
      } else {
        setAuthMode('login');
      }
    }
    setAuthLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setAuthError('Please fill in all registration fields.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    if (signupPassword.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    setAuthLoading(true);
    const result = await registerMasterAdmin(signupName, signupEmail, signupPassword);
    setAuthLoading(false);

    if (result.success && result.admin) {
      setCurrentUser({ name: result.admin.name, email: result.admin.email });
      setHasRegistered(true);
      loadAppointments();
    } else {
      setAuthError(result.error || 'Failed to create admin account.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!loginUser.trim() || !loginPassword) {
      setAuthError('Please enter your username/email and password.');
      return;
    }

    setAuthLoading(true);
    const result = await loginAdmin(loginUser, loginPassword);
    setAuthLoading(false);

    if (result.success && result.admin) {
      setCurrentUser(result.admin);
      loadAppointments();
    } else {
      setAuthError(result.error || 'Invalid credentials.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setCurrentUser(null);
    setLoginPassword('');
    setAuthMode('login');
  };

  const loadAppointments = async () => {
    setLoading(true);
    const combined: UnifiedAppointment[] = [];
    const seenMap = new Set<string>();

    // 1. Fetch from Supabase
    try {
      const sbData = await fetchAppointmentsFromSupabase();
      sbData.forEach((item) => {
        const id = item.id;
        const patientName = item.patient_name || item.patientName || 'Anonymous';
        const phone = item.phone || '';
        const service = item.service || 'General Examination';
        const preferredDate = item.preferred_date || item.preferredDate || '';
        const preferredTime = item.preferred_time || item.preferredTime || '';
        const status = (item.status as any) || 'pending';
        const createdAt = item.created_at || item.createdAt || new Date().toISOString();

        seenMap.add(`${phone}_${patientName}_${preferredDate}`);
        combined.push({
          id,
          source: 'supabase',
          patientName,
          phone,
          service,
          preferredDate,
          preferredTime,
          notes: item.notes,
          status,
          createdAt,
        });
      });
    } catch (err) {
      console.warn('Supabase load note:', err);
    }

    // 2. Fetch from Firebase
    try {
      const fbData = await fetchAppointmentsFromFirebase();
      fbData.forEach((item) => {
        const key = `${item.phone}_${item.patientName}_${item.preferredDate}`;
        if (!seenMap.has(key)) {
          combined.push({
            id: item.id || `fb-${Math.random()}`,
            source: 'firestore',
            patientName: item.patientName,
            phone: item.phone,
            service: item.service,
            preferredDate: item.preferredDate,
            preferredTime: item.preferredTime,
            notes: item.notes,
            status: item.status,
            createdAt: item.createdAt,
          });
        }
      });
    } catch (err) {
      console.warn('Firestore load note:', err);
    }

    // Sort newest first
    combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setAppointments(combined);
    setLoading(false);
  };

  const handleStatusChange = async (
    app: UnifiedAppointment,
    newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  ) => {
    try {
      if (app.source === 'supabase') {
        await updateAppointmentStatusInSupabase(app.id, newStatus);
      } else {
        await updateAppointmentStatusInFirebase(app.id, newStatus);
      }
      setAppointments((prev) =>
        prev.map((item) => (item.id === app.id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      alert('Could not update status: ' + err);
    }
  };

  const handleDelete = async (app: UnifiedAppointment) => {
    if (!window.confirm(`Delete booking for "${app.patientName}"?`)) return;
    try {
      if (app.source === 'supabase') {
        await deleteAppointmentFromSupabase(app.id);
      } else {
        await deleteAppointmentInFirebase(app.id);
      }
      setAppointments((prev) => prev.filter((item) => item.id !== app.id));
    } catch (err) {
      alert('Could not delete appointment: ' + err);
    }
  };

  // Filtered & searched appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesBackend = backendFilter === 'all' || app.source === backendFilter;
      const matchesQuery =
        !searchQuery.trim() ||
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.preferredDate.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesBackend && matchesQuery;
    });
  }, [appointments, statusFilter, backendFilter, searchQuery]);

  // Metric counts
  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === 'pending').length,
      confirmed: appointments.filter((a) => a.status === 'confirmed').length,
      completed: appointments.filter((a) => a.status === 'completed').length,
    };
  }, [appointments]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-white rounded-2xl max-w-5xl w-full p-5 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Smile Dental Care Clinic · Admin Portal
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <Database className="w-3 h-3" />
                  <span>Supabase: orwxcavhwjpqklalmydf</span>
                </span>
                <span>·</span>
                <span className="text-teal-700 font-medium">Firestore Synced</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={() => setShowSqlGuide(!showSqlGuide)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1"
                title="View Supabase SQL schema"
              >
                <Code className="w-3.5 h-3.5 text-teal-600" />
                <span className="hidden sm:inline">SQL Schema</span>
              </button>
            )}

            {currentUser && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1"
                title="Sign out from admin panel"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional SQL guide dropdown */}
        {showSqlGuide && (
          <div className="p-4 bg-slate-900 text-slate-200 text-xs rounded-xl mt-3 space-y-2 border border-slate-700 font-mono shrink-0">
            <div className="flex items-center justify-between text-white font-sans font-bold text-xs">
              <span>Supabase SQL Table Schema (Project: orwxcavhwjpqklalmydf)</span>
              <button
                onClick={() => setShowSqlGuide(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-400 font-sans text-[11px]">
              Appointments submitted on the website save directly to your Supabase tables. Run this in your Supabase SQL Editor:
            </p>
            <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 overflow-x-auto text-[11px] leading-relaxed text-teal-300">
{`CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    preferred_date TEXT,
    preferred_time TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON public.appointments FOR UPDATE USING (true);`}
            </pre>
          </div>
        )}

        {/* AUTHENTICATION VIEW (Single Slot Registration or Login) */}
        {!currentUser ? (
          <div className="py-8 sm:py-12 flex-1 overflow-y-auto flex flex-col items-center justify-center max-w-md mx-auto w-full">
            {hasRegistered === false ? (
              /* SINGLE ADMIN ACCOUNT REGISTRATION SLOT */
              <div className="w-full space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Single Admin Slot Available</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Create Master Admin Account
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                    You have exactly <strong>one slot</strong> to register your master administrator credentials. 
                    Once created, registration will be permanently closed and nobody else will be able to create an account.
                  </p>
                </div>

                {authError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Admin Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Imtiaz Hussain"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Admin Email or Username *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. admin@smiledentalcare.pk"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Admin Password * (Minimum 6 characters)
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Create secure password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors mt-2"
                  >
                    {authLoading ? 'Registering Admin Account...' : 'Claim Slot & Create Master Account'}
                  </button>
                </form>
              </div>
            ) : (
              /* ADMIN LOGIN (SLOT ALREADY CLAIMED) */
              <div className="w-full space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center mx-auto shadow-sm">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Single Admin Account Registered · Sign-up Closed</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Administrator Sign In
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    The single admin registration slot for Smile Dental Care Clinic has already been claimed. Please log in with your admin credentials.
                  </p>
                </div>

                {authError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Admin Username or Email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter registered username or email"
                      value={loginUser}
                      onChange={(e) => setLoginUser(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter admin password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
                  >
                    {authLoading ? 'Verifying...' : 'Log In to Admin Dashboard'}
                  </button>
                </form>

                <p className="text-[11px] text-center text-slate-400">
                  Strict single-account security: New account registration is disabled.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* LOGGED IN ADMIN DASHBOARD */
          <div className="flex-1 overflow-hidden flex flex-col pt-4">
            {/* Admin identity banner */}
            <div className="flex items-center justify-between pb-3 text-xs text-slate-600 border-b border-neutral-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>
                  Authenticated as <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.email})
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Master Administrator (Only 1 Account Registered)
              </span>
            </div>

            {/* Metric Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <span className="text-[11px] text-slate-500 block">Total Bookings</span>
                <span className="text-xl font-bold text-slate-900">{stats.total}</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
                <span className="text-[11px] text-amber-700 block">Pending Confirmation</span>
                <span className="text-xl font-bold text-amber-900">{stats.pending}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                <span className="text-[11px] text-emerald-700 block">Confirmed</span>
                <span className="text-xl font-bold text-emerald-900">{stats.confirmed}</span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60">
                <span className="text-[11px] text-blue-700 block">Completed</span>
                <span className="text-xl font-bold text-blue-900">{stats.completed}</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="space-y-2.5 pb-3 border-b border-neutral-100">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by patient name, phone, or service..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Refresh */}
                <button
                  onClick={loadAppointments}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Sync & Refresh</span>
                </button>
              </div>

              {/* Status and Backend filter pills */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs overflow-x-auto">
                  {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-md font-medium capitalize transition-colors ${
                        statusFilter === st
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs">
                  <button
                    onClick={() => setBackendFilter('all')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      backendFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Backends ({appointments.length})
                  </button>
                  <button
                    onClick={() => setBackendFilter('supabase')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      backendFilter === 'supabase'
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Supabase ({appointments.filter((a) => a.source === 'supabase').length})
                  </button>
                  <button
                    onClick={() => setBackendFilter('firestore')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      backendFilter === 'firestore'
                        ? 'bg-white text-teal-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Firestore ({appointments.filter((a) => a.source === 'firestore').length})
                  </button>
                </div>
              </div>
            </div>

            {/* Appointments List */}
            <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1">
              {loading && appointments.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-xs">
                  Loading bookings from Supabase & Firestore...
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">No matching bookings</p>
                  <p className="text-xs text-slate-400">
                    {searchQuery
                      ? 'Try adjusting your search query or filters.'
                      : 'When patients book an appointment on the website, it will show up here in real time.'}
                  </p>
                </div>
              ) : (
                filteredAppointments.map((app) => (
                  <div
                    key={`${app.source}-${app.id}`}
                    className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-neutral-50/60 space-y-3 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">
                            {app.patientName}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                              app.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : app.status === 'cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {app.status}
                          </span>
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              app.source === 'supabase'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-teal-50 text-teal-700 border-teal-200'
                            }`}
                          >
                            {app.source === 'supabase' ? 'Supabase Table' : 'Firestore'}
                          </span>
                        </div>
                        <p className="text-xs text-teal-800 font-medium mt-0.5">
                          {app.service}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <a
                          href={`tel:${app.phone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-neutral-200 text-slate-700 hover:bg-neutral-50"
                        >
                          <Phone className="w-3 h-3 text-teal-600" />
                          <span>{app.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${app.patientName}, this is Smile Dental Care Clinic regarding your appointment for ${app.service}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-semibold"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-neutral-200/60">
                      <div>
                        <span className="font-semibold text-slate-800">Preferred Date & Slot:</span>{' '}
                        {app.preferredDate} ({app.preferredTime})
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">Submitted:</span>{' '}
                        {new Date(app.createdAt).toLocaleString()}
                      </div>
                      {app.notes && (
                        <div className="sm:col-span-2 text-slate-500 italic bg-white p-2 rounded border border-neutral-200/50">
                          <strong>Patient Note:</strong> "{app.notes}"
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-medium">Update Status:</span>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(
                              app,
                              e.target.value as 'pending' | 'confirmed' | 'completed' | 'cancelled'
                            )
                          }
                          className="px-2 py-1 rounded border border-neutral-300 text-xs bg-white text-slate-700"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {app.id && (
                        <button
                          onClick={() => handleDelete(app)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors flex items-center gap-1"
                          title="Delete appointment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
