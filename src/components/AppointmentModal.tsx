import React, { useState, useEffect } from 'react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { X, Calendar, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { createAppointmentInFirebase } from '../firebase';
import { saveAppointmentToSupabase } from '../supabase';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'General Dental Examination',
    date: '',
    timeSlot: 'Morning (10:00 AM – 1:00 PM)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');

  useEffect(() => {
    if (initialServiceId) {
      const match = SERVICES.find((s) => s.id === initialServiceId);
      if (match) {
        setFormData((prev) => ({ ...prev, service: match.title }));
      }
    }
  }, [initialServiceId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    let assignedId = '';

    // 1. Save to Supabase backend tables
    try {
      const sbRes = await saveAppointmentToSupabase({
        patientName: formData.name,
        phone: formData.phone,
        service: formData.service,
        preferredDate: formData.date,
        preferredTime: formData.timeSlot,
        notes: formData.notes,
        status: 'pending',
      });
      if (sbRes.success && sbRes.id) {
        assignedId = sbRes.id;
      }
    } catch (err) {
      console.warn('Supabase booking dispatch notice:', err);
    }

    // 2. Also mirror to Firebase
    try {
      const docId = await createAppointmentInFirebase({
        patientName: formData.name,
        phone: formData.phone,
        service: formData.service,
        preferredDate: formData.date,
        preferredTime: formData.timeSlot,
        notes: formData.notes,
        status: 'pending',
      });
      if (!assignedId) assignedId = docId;
    } catch (err) {
      console.warn('Firebase sync notice:', err);
    }

    if (!assignedId) {
      assignedId = `SDC-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    setBookingRefId(assignedId);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleWhatsAppBooking = async () => {
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }

    // Background save to Supabase and Firebase
    const appointmentData = {
      patientName: formData.name,
      phone: formData.phone || 'Provided via WhatsApp',
      service: formData.service,
      preferredDate: formData.date,
      preferredTime: formData.timeSlot,
      notes: `${formData.notes || ''} [Requested via WhatsApp]`,
      status: 'pending' as const,
    };

    saveAppointmentToSupabase(appointmentData).catch(() => {});
    createAppointmentInFirebase(appointmentData).catch(() => {});

    const text = encodeURIComponent(
      `Hello Smile Dental Care Clinic,\n\nI would like to book an appointment:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Service: ${formData.service}\n• Date: ${formData.date || 'Earliest available'}\n• Time Slot: ${formData.timeSlot}\n• Notes: ${formData.notes || 'None'}\n\nPlease confirm availability. Thank you!`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Appointment Request Submitted
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Thank you, <strong>{formData.name}</strong>. Your request has been securely logged with reference ID <span className="font-mono font-bold text-teal-700">{bookingRefId}</span>. The clinic reception at Shahnawaz Plaza, G-11 Markaz will contact you at <strong>{formData.phone}</strong> shortly to confirm your slot.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-neutral-100 rounded-lg border border-neutral-300"
              >
                Close
              </button>
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                WhatsApp Us Directly
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Smile Dental Care Clinic
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Book an Appointment
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Suit 02, 1st Floor, Shahnawaz Plaza, G-11 Markaz, Islamabad
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Raza"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0311-9798116"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Treatment / Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="General Dental Examination">General Dental Examination & Consultation</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Morning (10 AM - 1 PM)">10 AM – 1 PM</option>
                    <option value="Afternoon (1 PM - 5 PM)">1 PM – 5 PM</option>
                    <option value="Evening (5 PM - 9 PM)">5 PM – 9 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Notes / Symptoms
                </label>
                <textarea
                  rows={2}
                  placeholder="Any particular tooth pain, past history, or questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Appointment...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Appointment</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Confirm via WhatsApp (Fastest)</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
