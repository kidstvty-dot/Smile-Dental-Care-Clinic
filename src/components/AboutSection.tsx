import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { CheckCircle2, Shield, HeartHandshake, Sparkles } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { IMAGES } from '../assets/images';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image & Trust Badge */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 aspect-[4/3] bg-neutral-200">
                <SmartImage
                  src={IMAGES.doctorConsultation}
                  fallbackSrc="/images/doctor_consultation.jpg"
                  alt="Doctor consultation at Smile Dental Care Clinic G-11 Markaz Islamabad"
                  className="w-full h-full object-cover"
                  fallbackLabel="Dr. Imtiaz Hussain Consultation"
                />
              </div>

              {/* Floating quote / philosophy card */}
              <div className="mt-4 p-5 rounded-xl bg-white border border-neutral-200/80 shadow-sm">
                <p className="text-sm italic text-slate-700 leading-relaxed">
                  "Our priority is simple: provide gentle, unhurried dental care where every patient feels completely heard, comfortable, and confident in their treatment plan."
                </p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">Dr. Imtiaz Hussain</span>
                  <span className="text-teal-700 font-medium">B.Sc., B.D.S (RDS), C.A.E (UK)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              About Smile Dental Care Clinic
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              A Modern, Gentle & Compassionate Dental Practice in G-11 Markaz
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Conveniently located at Shahnawaz Plaza in the heart of G-11 Markaz, Islamabad, 
              <strong> Smile Dental Care Clinic</strong> was founded with a singular commitment: delivering 
              world-class oral healthcare with warmth, technical precision, and absolute transparency.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Under the clinical direction of <strong>Dr. Imtiaz Hussain</strong>, our practice has earned a 
              <strong> 4.9-star rating from over 360 patient reviews</strong> by consistently prioritizing patient 
              well-being over rushed appointments. Whether you are coming in for routine scaling, an emergency toothache, 
              or a complete cosmetic smile makeover, we ensure every procedure is explained clearly and performed with minimal discomfort.
            </p>

            {/* Core Commitments List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Uncompromised Sterilization</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Autoclaved instruments unsealed in front of each patient.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Fear-Free Dentistry</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Gentle techniques designed to relieve anxiety and ensure comfort.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Aesthetic Excellence</h4>
                  <p className="text-xs text-slate-500 mt-0.5">UK-certified aesthetic training for natural tooth morphology.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Transparent Diagnosis</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Digital intraoral views and honest, upfront treatment plans.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors"
              >
                Schedule a Consultation
              </button>
              <a
                href="#services"
                className="text-sm font-semibold text-teal-800 hover:text-teal-900 underline underline-offset-4"
              >
                Explore Services & Treatments →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
