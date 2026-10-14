import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MessageCircle, Phone, Calendar } from 'lucide-react';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Book Appointment Floating Button */}
      <button
        onClick={onOpenBooking}
        className="hidden sm:flex items-center gap-2 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
        title="Schedule Dental Appointment"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Appointment</span>
      </button>

      {/* Direct Call Button (Mobile & Desktop) */}
      <a
        href={`tel:${CLINIC_INFO.phoneTel}`}
        className="flex items-center justify-center w-11 h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        title={`Call ${CLINIC_INFO.phone}`}
      >
        <Phone className="w-4 h-4 text-teal-400" />
      </a>

      {/* WhatsApp Floating Chat Bubble */}
      <a
        href={CLINIC_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        title="Chat on WhatsApp with Smile Dental Care Clinic"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </aside>
  );
};
