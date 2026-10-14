import React, { useMemo } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Clock, Phone, MessageCircle, Navigation, ExternalLink, CheckCircle2 } from 'lucide-react';

export const LocationAndHours: React.FC = () => {
  // Compute current open/closed status based on Pakistan Time (PKT is UTC+5)
  const clinicStatus = useMemo(() => {
    try {
      const now = new Date();
      // Format time in Asia/Karachi timezone
      const pktString = now.toLocaleString("en-US", { timeZone: "Asia/Karachi" });
      const pktDate = new Date(pktString);
      const day = pktDate.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const hour = pktDate.getHours();

      if (day === 0) {
        return {
          isOpen: false,
          statusText: "By Prior Appointment & Emergency",
          subText: "Regular clinic hours resume Monday 10:00 AM",
        };
      }

      if (hour >= CLINIC_INFO.openHour && hour < CLINIC_INFO.closeHour) {
        return {
          isOpen: true,
          statusText: "Open Now",
          subText: `Closes at 9:00 PM tonight`,
        };
      } else {
        return {
          isOpen: false,
          statusText: "Closed Now",
          subText: `Opens at 10:00 AM (${day === 6 ? 'Monday' : 'tomorrow'})`,
        };
      }
    } catch {
      return {
        isOpen: true,
        statusText: "Open Mon – Sat",
        subText: "10:00 AM – 9:00 PM",
      };
    }
  }, []);

  return (
    <section id="location" className="py-20 bg-neutral-100/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Find Our Practice
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Location, Directions & Clinic Timings
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Easily accessible in G-11 Markaz Islamabad with convenient parking, elevator access, and evening availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hours & Address Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Status Header Card */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <span className="text-xs font-medium text-slate-500 block">Current Status (PKT)</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${
                        clinicStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className="text-base font-bold text-slate-900">
                      {clinicStatus.statusText}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 text-right">
                  {clinicStatus.subText}
                </span>
              </div>

              {/* Verified Address */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Clinic Address</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {CLINIC_INFO.address.suite}, {CLINIC_INFO.address.building}<br />
                      {CLINIC_INFO.address.street}, {CLINIC_INFO.address.area}<br />
                      {CLINIC_INFO.address.city}, {CLINIC_INFO.address.country}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      <strong>Landmark:</strong> Shahnawaz Plaza near main G-11 Markaz commercial center. Take stairs or elevator to 1st floor, Suite 2.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timings Table */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Operating Schedule</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  {CLINIC_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between py-1.5 border-b border-neutral-100 last:border-0">
                      <span className="font-medium text-slate-700">{h.days}</span>
                      <span className="font-semibold text-slate-900">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Action Links */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={CLINIC_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-slate-300 text-slate-800 hover:bg-neutral-50 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500">Call / WhatsApp Reception</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">{CLINIC_INFO.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${CLINIC_INFO.phoneTel}`}
                  className="p-2.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
                  title="Call clinic"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={CLINIC_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                  title="WhatsApp clinic"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Embed View */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-200 bg-white">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span className="font-semibold">Smile Dental Care Clinic · G-11 Markaz Islamabad</span>
                </div>
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-300 hover:text-white flex items-center gap-1 underline underline-offset-2"
                >
                  <span>View Larger Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Map Embed */}
              <div className="aspect-[16/10] sm:aspect-[16/11] w-full bg-neutral-200">
                <iframe
                  title="Google Maps Location for Smile Dental Care Clinic Islamabad"
                  src="https://maps.google.com/maps?q=33.668522,72.9970727&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>Exact Coordinates: 33.668522° N, 72.9970727° E</span>
                <span className="text-teal-700 font-medium">Free Parking Available Around Plaza</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
