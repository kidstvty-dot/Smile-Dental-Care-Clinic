import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, MessageCircle, Calendar, Menu, X, MapPin, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top micro-bar for quick contact info */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>G-11 Markaz, Islamabad (Shahnawaz Plaza, 1st Floor)</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Mon – Sat: 10:00 AM – 9:00 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${CLINIC_INFO.phoneTel}`}
              className="hover:text-white transition-colors flex items-center gap-1 font-medium text-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-neutral-200 shadow-sm py-3'
            : 'bg-white border-neutral-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo & Clinic Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm group-hover:bg-teal-700 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5 2.5 8 .5 1.5 1 3.5 1.5 5 .3.9 1.2 1 1.7.5.8-.8 1.3-2 1.3-3.5 0-1.5.5-2.5 1-2.5s1 1 1 2.5c0 1.5.5 2.7 1.3 3.5.5.5 1.4.4 1.7-.5.5-1.5 1-3.5 1.5-5 1-3 2.5-5 2.5-8 0-3.5-2.5-6-6-6zm0 2c2.5 0 4 1.8 4 4.5 0 2.2-1.2 4-2.1 6.8-.5 1.5-1.1 3.4-1.4 4.7-.2-.5-.5-1.1-.5-2 0-2.2-1-3.5-2-3.5s-2 1.3-2 3.5c0 .9-.3 1.5-.5 2-.3-1.3-.9-3.2-1.4-4.7C7.2 12.5 6 10.7 6 8.5 6 5.8 7.5 4 12 4z" />
              </svg>
            </div>
            <div>
              <span className="block font-bold text-lg text-slate-900 tracking-tight leading-tight group-hover:text-teal-700 transition-colors">
                Smile Dental Care Clinic
              </span>
              <span className="block text-xs text-slate-500 font-medium">
                Dr. Imtiaz Hussain · G-11 Markaz Islamabad
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-teal-700 transition-colors py-1">
              Services
            </a>
            <a href="#about" className="hover:text-teal-700 transition-colors py-1">
              About Clinic
            </a>
            <a href="#doctor" className="hover:text-teal-700 transition-colors py-1">
              Dr. Imtiaz
            </a>
            <a href="#why-us" className="hover:text-teal-700 transition-colors py-1">
              Why Choose Us
            </a>
            <a href="#gallery" className="hover:text-teal-700 transition-colors py-1">
              Gallery
            </a>
            <a href="#reviews" className="hover:text-teal-700 transition-colors py-1">
              Reviews
            </a>
            <a href="#location" className="hover:text-teal-700 transition-colors py-1">
              Location & Hours
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={CLINIC_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-all hover:shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-md"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-100"
              >
                Services & Treatments
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-100"
              >
                About Clinic
              </a>
              <a
                href="#doctor"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-100"
              >
                Dr. Imtiaz Hussain (BDS, CAE UK)
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-100"
              >
                Hygiene & Why Choose Us
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-100"
              >
                Clinic Gallery
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-100"
              >
                Patient Reviews (4.9 Rating)
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-100"
              >
                Location & Timings (G-11 Markaz)
              </a>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-teal-600 text-white font-medium text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${CLINIC_INFO.phoneTel}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>Call 0311-9798116</span>
                </a>
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
