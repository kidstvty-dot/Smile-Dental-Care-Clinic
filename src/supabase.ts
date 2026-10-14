import { createClient } from '@supabase/supabase-js';

// Project credentials provided for project: orwxcavhwjpqklalmydf
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://orwxcavhwjpqklalmydf.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_JaYdYjjGjHV5IXQYlV3uIg_tjwSS-r_';

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseAppointmentInput {
  patientName: string;
  phone: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface SupabaseAppointmentRecord {
  id: string;
  patient_name?: string;
  patientName?: string;
  phone: string;
  service: string;
  preferred_date?: string;
  preferredDate?: string;
  preferred_time?: string;
  preferredTime?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
  createdAt?: string;
}

/**
 * Save an appointment booking directly to Supabase backend table 'appointments'.
 * Handles both snake_case and camelCase column formats gracefully.
 */
export async function saveAppointmentToSupabase(
  data: SupabaseAppointmentInput
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // 1. Try standard PostgreSQL snake_case columns
    const snakePayload = {
      patient_name: data.patientName.trim(),
      phone: data.phone.trim(),
      service: data.service,
      preferred_date: data.preferredDate || 'Earliest available',
      preferred_time: data.preferredTime || 'Morning (10:00 AM – 1:00 PM)',
      notes: data.notes?.trim() || '',
      status: data.status || 'pending',
      created_at: new Date().toISOString(),
    };

    const { data: resData, error: snakeError } = await supabase
      .from('appointments')
      .insert([snakePayload])
      .select();

    if (!snakeError && resData && resData.length > 0) {
      return { success: true, id: resData[0].id };
    }

    // 2. If snake_case had a column naming error, try camelCase format
    if (snakeError) {
      const camelPayload = {
        patientName: data.patientName.trim(),
        phone: data.phone.trim(),
        service: data.service,
        preferredDate: data.preferredDate || 'Earliest available',
        preferredTime: data.preferredTime || 'Morning (10:00 AM – 1:00 PM)',
        notes: data.notes?.trim() || '',
        status: data.status || 'pending',
        createdAt: new Date().toISOString(),
      };

      const { data: camelData, error: camelError } = await supabase
        .from('appointments')
        .insert([camelPayload])
        .select();

      if (!camelError && camelData && camelData.length > 0) {
        return { success: true, id: camelData[0].id };
      }

      console.warn('Supabase insert message:', snakeError.message || camelError?.message);
      return { success: false, error: snakeError.message };
    }

    return { success: true, id: 'sb-saved' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn('Supabase booking dispatch error:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Fetch appointments from Supabase
 */
export async function fetchAppointmentsFromSupabase(): Promise<SupabaseAppointmentRecord[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Retry without order in case created_at column differs
      const retry = await supabase.from('appointments').select('*');
      if (retry.error) throw retry.error;
      return (retry.data as SupabaseAppointmentRecord[]) || [];
    }

    return (data as SupabaseAppointmentRecord[]) || [];
  } catch (err) {
    console.warn('Supabase fetch notice:', err);
    return [];
  }
}

/**
 * Update appointment status in Supabase
 */
export async function updateAppointmentStatusInSupabase(
  id: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete appointment from Supabase
 */
export async function deleteAppointmentFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Save contact inquiry to Supabase
 */
export async function saveInquiryToSupabase(data: {
  name: string;
  phone: string;
  message: string;
}): Promise<boolean> {
  try {
    const { error } = await supabase.from('inquiries').insert([
      {
        name: data.name.trim(),
        phone: data.phone.trim(),
        message: data.message.trim(),
        created_at: new Date().toISOString(),
      },
    ]);
    return !error;
  } catch {
    return false;
  }
}
