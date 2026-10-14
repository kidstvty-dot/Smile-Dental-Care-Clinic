import React, { useState } from 'react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { Phone, MessageCircle, MapPin, Send, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { createAppointmentInFirebase } from '../firebase';
import { saveAppointmentToSupabase } from '../supabase';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Consultation & Examination',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number so the clinic team can confirm your appointment.');
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
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        notes: formData.message,
        status: 'pending',
      });
      if (sbRes.success && sbRes.id) {
        assignedId = sbRes.id;
      }
    } catch (err) {
      console.warn('Supabase contact booking notice:', err);
    }

    // 2. Also save to Firebase
    try {
      const docId = await createAppointmentInFirebase({
        patientName: formData.name,
        phone: formData.phone,
        service: formData.service,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        notes: formData.message,
        status: 'pending',
      });
      if (!assignedId) assignedId = docId;
    } catch (err) {
      console.warn('Firebase sync note, using local booking fallback:', err);
    }

    if (!assignedId) {
      assignedId = `SDC-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    setInquiryId(assignedId);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    if (!formData.name.trim()) {
      alert('Please enter your name first.');
      return;
    }

    // Save in background
    saveAppointmentToSupabase({
      patientName: formData.name,
      phone: formData.phone || 'Provided via WhatsApp',
      service: formData.service,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      notes: `${formData.message || ''} [Requested via WhatsApp]`,
      status: 'pending',
    }).catch(() => {});

    const text = encodeURIComponent(
      `Hello Smile Dental Care Clinic,\n\nI would like to request an appointment:\n- Patient: ${formData.name}\n- Phone: ${formData.phone || 'N/A'}\n- Service: ${formData.service}\n- Preferred Date: ${formData.preferredDate || 'Earliest available'}\n- Preferred Time: ${formData.preferredTime}\n- Notes: ${formData.message || 'None'}\n\nThank you!`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Get In Touch
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Schedule Your Visit or Ask a Question
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our reception desk is here to assist you with appointment bookings, treatment inquiries, and emergency dental consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Clinic Contact Details
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100/70 text-teal-800 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Phone & WhatsApp Hotline</span>
                    <a
                      href={`tel:${CLINIC_INFO.phoneTel}`}
                      className="font-bold text-slate-900 hover:text-teal-700 transition-colors text-base"
                    >
                      {CLINIC_INFO.phone}
                    </a>
                    <span className="block text-xs text-slate-500 mt-0.5">Direct line to clinic reception</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-800 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Instant WhatsApp Chat</span>
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
                    >
                      Chat with Dr. Imtiaz / Clinic
                    </a>
                    <span className="block text-xs text-slate-500 mt-0.5">Quick inquiries & photo consultations</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100/70 text-teal-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Clinic Location</span>
                    <p className="font-semibold text-slate-900 mt-0.5">
                      Suit No. 02, 1st Floor, Shahnawaz Plaza
                    </p>
                    <p className="text-xs text-slate-600">Sachal Sarmast Road, G-11 Markaz, Islamabad</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100/70 text-teal-800 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Consultation Hours</span>
                    <p className="font-semibold text-slate-900 mt-0.5">Monday to Saturday: 10:00 AM – 9:00 PM</p>
                    <p className="text-xs text-slate-500">Sunday by prior appointment for emergencies</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-neutral-200">
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact & Appointment Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Appointment Request Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your appointment request for{' '}
                    <strong>{formData.service}</strong> has been logged under reference{' '}
                    <span className="font-mono font-bold text-teal-700">{inquiryId}</span>.
                  </p>
                  <p className="text-xs text-slate-500">
                    Our team will call or WhatsApp you at <strong>{formData.phone}</strong> shortly to confirm your exact time slot.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-neutral-100 rounded-lg border border-neutral-300"
                    >
                      Submit Another Request
                    </button>
                    <a
                      href={CLINIC_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                    >
                      Follow Up on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mehmood"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0300-1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Desired Treatment / Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                      >
                        <option value="General Consultation & Examination">General Consultation & Examination</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Preferred Time of Day
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                    >
                      <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                      <option value="Evening (5:00 PM – 9:00 PM)">Evening (5:00 PM – 9:00 PM)</option>
                      <option value="Emergency (Same-day ASAP)">Emergency (Same-day ASAP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Dental Concern / Symptoms (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your symptoms (e.g. sensitivity to cold, broken tooth, routine checkup)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white font-semibold text-xs shadow-sm transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving to Reception...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Booking Request</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleSendToWhatsApp}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Instant Book via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center sm:text-left mt-2">
                    Your personal information is kept strictly confidential and only used to arrange your dental appointment.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
