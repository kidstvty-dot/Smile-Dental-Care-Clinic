-- SQL Script to set up appointments table in your Supabase backend
-- Run this in your Supabase Dashboard -> SQL Editor (Project: orwxcavhwjpqklalmydf)

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    preferred_date TEXT,
    preferred_time TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public website visitors to submit appointment bookings
CREATE POLICY "Allow anonymous appointment creation"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading appointments in the clinic portal
CREATE POLICY "Allow reading appointments"
ON public.appointments
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow updating appointment status
CREATE POLICY "Allow updating appointment status"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Optional: Contact Inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inquiry creation"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow reading inquiries"
ON public.inquiries
FOR SELECT
TO anon, authenticated
USING (true);
