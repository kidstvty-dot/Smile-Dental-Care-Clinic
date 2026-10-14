import React from 'react';
import { Star, ShieldCheck, Clock, Award } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const HighlightsStrip: React.FC = () => {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Metric 1 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 shrink-0">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">4.9 / 5.0</div>
              <div className="text-xs text-slate-500 mt-0.5">360+ Verified Google Reviews</div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 shrink-0">
              <Award className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">C.A.E (UK)</div>
              <div className="text-xs text-slate-500 mt-0.5">Certified Aesthetic Dentist</div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">100% Sterile</div>
              <div className="text-xs text-slate-500 mt-0.5">Hospital-Grade Autoclaving</div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 shrink-0">
              <Clock className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">10 AM – 9 PM</div>
              <div className="text-xs text-slate-500 mt-0.5">Mon to Sat (G-11 Markaz)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
