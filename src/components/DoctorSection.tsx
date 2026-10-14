import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Award, CheckCircle, GraduationCap, Stethoscope, HeartHandshake } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { IMAGES } from '../assets/images';

interface DoctorSectionProps {
  onOpenBooking: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({ onOpenBooking }) => {
  const doctor = CLINIC_INFO.leadDoctor;

  return (
    <section id="doctor" className="py-20 bg-neutral-100/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Doctor Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-neutral-200 aspect-[4/3] bg-neutral-200">
              <SmartImage
                src={IMAGES.doctorConsultation}
                fallbackSrc="/images/doctor_consultation.jpg"
                alt="Dr. Imtiaz Hussain BDS RDS CAE UK at Smile Dental Care Clinic Islamabad"
                className="w-full h-full object-cover object-top"
                fallbackLabel="Dr. Imtiaz Hussain BDS, CAE UK"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-teal-300">Lead Clinician</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{doctor.name}</h3>
                <p className="text-xs text-slate-300">{doctor.qualifications}</p>
              </div>
            </div>

            {/* Quick Credential Badges */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                <div className="text-sm font-bold text-slate-900">B.D.S (RDS)</div>
                <div className="text-[11px] text-slate-500">Registered Dental Surgeon</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs">
                <div className="text-sm font-bold text-slate-900">C.A.E (UK)</div>
                <div className="text-[11px] text-slate-500">Certified Aesthetic Practitioner</div>
              </div>
            </div>
          </div>

          {/* Doctor Biography and Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Meet Your Dentist
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Dr. Imtiaz Hussain
            </h2>
            <p className="text-sm font-medium text-teal-800">
              B.Sc., B.D.S (RDS), C.A.E (UK) · Dental Surgeon & Aesthetic Practitioner
            </p>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                {doctor.bio}
              </p>
              <p>
                With advanced training from the United Kingdom in Aesthetic Dentistry (C.A.E UK), 
                Dr. Imtiaz combines clinical rigor with artistic precision. He believes that dental visits should 
                never be a source of stress or discomfort. Every patient receives a comprehensive diagnostic evaluation 
                and honest recommendations without unnecessary overtreatment.
              </p>
            </div>

            {/* Key Clinical Tenets */}
            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">International Aesthetic Certification</h4>
                  <p className="text-xs text-slate-500">Trained in modern cosmetic veneers, lifelike composite bonding, and restorative dental balance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Conservative & Minimally Invasive Philosophy</h4>
                  <p className="text-xs text-slate-500">Preserving as much natural tooth structure and enamel as possible.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Transparent Treatment Counseling</h4>
                  <p className="text-xs text-slate-500">Taking the time to walk you through x-rays and intraoral findings before starting any procedure.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors"
              >
                Book with Dr. Imtiaz
              </button>
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                Ask a Question on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
