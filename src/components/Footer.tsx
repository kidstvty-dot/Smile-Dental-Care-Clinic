import React from 'react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { MapPin, Phone, MessageCircle, ExternalLink, ShieldCheck, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Doctor Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5 2.5 8 .5 1.5 1 3.5 1.5 5 .3.9 1.2 1 1.7.5.8-.8 1.3-2 1.3-3.5 0-1.5.5-2.5 1-2.5s1 1 1 2.5c0 1.5.5 2.7 1.3 3.5.5.5 1.4.4 1.7-.5.5-1.5 1-3.5 1.5-5 1-3 2.5-5 2.5-8 0-3.5-2.5-6-6-6zm0 2c2.5 0 4 1.8 4 4.5 0 2.2-1.2 4-2.1 6.8-.5 1.5-1.1 3.4-1.4 4.7-.2-.5-.5-1.1-.5-2 0-2.2-1-3.5-2-3.5s-2 1.3-2 3.5c0 .9-.3 1.5-.5 2-.3-1.3-.9-3.2-1.4-4.7C7.2 12.5 6 10.7 6 8.5 6 5.8 7.5 4 12 4z" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-white text-base tracking-tight block">
                  Smile Dental Care Clinic
                </span>
                <span className="text-[11px] text-teal-400">
                  Dr. Imtiaz Hussain (BDS, RDS, CAE UK)
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Providing modern, compassionate, and pain-free dental healthcare to individuals and families across Islamabad. Specializing in cosmetic restorations, painless root canals, whitening, and preventive oral health.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span className="text-xs">Hospital-Grade Sterilization Protocols</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors">
                  About Practice
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Services & Treatments
                </a>
              </li>
              <li>
                <a href="#doctor" className="hover:text-teal-400 transition-colors">
                  Dr. Imtiaz Hussain
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-teal-400 transition-colors">
                  Hygiene Standards
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-teal-400 transition-colors">
                  Clinic Tour & Photos
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-teal-400 transition-colors">
                  Patient Reviews (4.9 ★)
                </a>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-teal-400 transition-colors cursor-pointer text-left text-slate-400"
                  >
                    Admin Portal
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Core Services List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Featured Services
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Teeth Scaling & Ultrasonic Polishing</li>
              <li>Painless Rotary Root Canal Therapy</li>
              <li>Natural Composite Enamel Restorations</li>
              <li>Cosmetic Teeth Whitening</li>
              <li>Zirconia Crowns & Bridges</li>
              <li>Dental Implants & Tooth Replacement</li>
              <li>Gentle Pediatric Dental Care</li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Contact & Location
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Suit No. 02, 1st Floor, Shahnawaz Plaza, Sachal Sarmast Road, G-11 Markaz, Islamabad
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phoneTel}`} className="hover:text-white font-medium">
                  {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-teal-200 underline underline-offset-2"
              >
                <span>View Google Maps Listing</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Smile Dental Care Clinic. All rights reserved. Dr. Imtiaz Hussain (BDS, RDS, CAE UK).
          </div>
          <div className="flex items-center gap-4">
            <a href="#location" className="hover:text-slate-400 transition-colors">
              G-11 Markaz Islamabad
            </a>
            <span className="text-slate-700">·</span>
            <span>Mon–Sat: 10:00 AM – 9:00 PM</span>
            {onOpenAdmin && (
              <>
                <span className="text-slate-700">·</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-400 hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1 font-medium underline underline-offset-2"
                >
                  <Lock className="w-3 h-3 text-teal-400" />
                  <span>Admin Sign Up / Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
