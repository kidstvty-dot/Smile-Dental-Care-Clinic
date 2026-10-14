import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Star, ShieldCheck, MapPin, Calendar, MessageCircle, Navigation } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { IMAGES } from '../assets/images';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background ambient lighting and subtle texture */}
      <div className="absolute inset-0 bg-radial-gradient from-teal-900/20 via-slate-900 to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-teal-400 tracking-wide">
              <span>Dr. Imtiaz Hussain (BDS, CAE UK)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>G-11 Markaz, Islamabad</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400">Open Mon – Sat</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Advanced, Gentle & Aesthetic Dental Care in Islamabad
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Experience comfortable dental treatments at Smile Dental Care Clinic. We specialize in painless root canal therapy, cosmetic smile makeovers, teeth scaling, zirconia crowns, and restorative care with hospital-grade sterilization.
            </p>

            {/* Verified Trust Strip (Anti-slop clean unboxed presentation) */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white text-base">4.9</span>
                <span className="text-slate-400">({CLINIC_INFO.reviewCount} Google reviews)</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>100% Sterile Single-Use Instruments</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 active:bg-teal-700 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-800/80 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {CLINIC_INFO.phone}</span>
              </a>

              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-700 rounded-lg transition-colors"
                title="View on Google Maps"
              >
                <Navigation className="w-4 h-4 text-teal-400" />
                <span>Directions</span>
              </a>
            </div>

            {/* Quiet address reminder */}
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Suit No. 02, 1st Floor, Shahnawaz Plaza, Sachal Sarmast Road, G-11 Markaz</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/3] bg-slate-800">
              <SmartImage
                src={IMAGES.clinicHero}
                fallbackSrc="/images/clinic_hero.jpg"
                alt="Modern dental operatory room at Smile Dental Care Clinic in G-11 Markaz Islamabad"
                className="w-full h-full object-cover object-center"
                priority={true}
                fallbackLabel="Smile Dental Care Clinic Operatory"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Informative overlay on bottom of card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-teal-300">Modern Clinical Standards</p>
                    <p className="text-xs text-slate-300 mt-0.5">Ergonomic digital operatory & painless rotary endodontics</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-400">★ 4.9 Rating</span>
                    <span className="block text-[10px] text-slate-400">360+ Patients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
