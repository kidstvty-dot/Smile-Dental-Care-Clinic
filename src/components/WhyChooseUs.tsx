import React from 'react';
import { CLINIC_PILLARS, CLINIC_INFO } from '../data/clinicData';
import { ShieldCheck, Award, HeartHandshake, MapPin, Star, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      title: "UK-Certified Aesthetic Expertise",
      description: "Care directed by Dr. Imtiaz Hussain, B.Sc., B.D.S (RDS), C.A.E (UK), bringing international cosmetic precision and evidence-based clinical protocols.",
    },
    {
      icon: ShieldCheck,
      title: "Strict Hospital-Grade Sterilization",
      description: "Multi-cycle autoclaving and sterile single-use barrier pouches opened in front of each patient to guarantee 100% infection prevention.",
    },
    {
      icon: HeartHandshake,
      title: "Gentle & Painless Dentistry",
      description: "We use rotary endodontic systems, fine topical numbing, and compassionate pacing to make root canals and extractions worry-free.",
    },
    {
      icon: Star,
      title: "4.9-Star Google Reputation",
      description: "Trusted by hundreds of families across Islamabad with over 360 genuine five-star reviews commending our cleanliness and gentle care.",
    },
    {
      icon: MapPin,
      title: "Prime G-11 Markaz Accessibility",
      description: "Centrally located at Suit 02, 1st Floor, Shahnawaz Plaza on Sachal Sarmast Road, featuring convenient commercial parking and elevator access.",
    },
    {
      icon: Clock,
      title: "Convenient 10 AM – 9 PM Hours",
      description: "Flexible evening appointment slots throughout Monday to Saturday, allowing busy professionals and families to visit after working hours.",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Clinical Standards
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Why Patients Choose Smile Dental Care Clinic
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our reputation is built on authentic patient trust, uncompromised infection control, and modern dental technology in Islamabad.
          </p>
        </div>

        {/* Clean asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-teal-300 hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-600/10 text-teal-700 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sterilization Highlight Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-teal-600 text-white shrink-0 mt-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-teal-950">
                Our Patient Sterilization Pledge
              </h4>
              <p className="text-xs sm:text-sm text-teal-900/80 mt-1 max-w-2xl leading-relaxed">
                We adhere strictly to international CDC and WHO dental infection control guidelines. Every instrument is processed through ultrasonic cleaning, chemical disinfection, and high-pressure steam autoclaving.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs font-semibold text-teal-800 bg-teal-100/80 px-3 py-1.5 rounded-md">
              Hospital Standard
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
