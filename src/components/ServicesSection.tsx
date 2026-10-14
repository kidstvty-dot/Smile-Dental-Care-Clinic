import React, { useState } from 'react';
import { SERVICES, ServiceItem } from '../data/clinicData';
import { Check, Calendar, ArrowRight, Clock, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'preventive', label: 'Preventive & Hygiene' },
    { id: 'restorative', label: 'Restorative & RCT' },
    { id: 'cosmetic', label: 'Cosmetic & Whitening' },
    { id: 'surgical', label: 'Surgical & Implants' },
    { id: 'orthodontic', label: 'Aligners & Braces' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Comprehensive Dental Care
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Specialized Dental Services for the Entire Family
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From routine checkups and stain removal to gentle painless root canals and bespoke cosmetic makeovers,
            each procedure is conducted with precision equipment and strict clinical hygiene.
          </p>

          {/* Interactive Category Segmented Tabs (Functional Buttons) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-neutral-100 rounded-xl max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-white text-teal-900 shadow-sm border border-neutral-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-neutral-200/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-neutral-200 hover:border-teal-300 hover:shadow-md transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                    {service.category}
                  </span>
                  {service.duration && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>

                {/* Benefits List */}
                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5">
                  {service.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book This</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Callout Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Experiencing Acute Toothache or Dental Trauma?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Emergency Dental Appointments in G-11 Markaz
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              We prioritize urgent dental cases for immediate relief of severe throbbing pain, dental swelling, broken teeth, or dislodged crowns.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+923119798116"
              className="px-5 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow-sm transition-colors"
            >
              Call 0311-9798116
            </a>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  {selectedService.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-neutral-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 text-sm text-slate-600 leading-relaxed space-y-3">
              <p>{selectedService.fullDesc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                What to Expect & Key Benefits:
              </h4>
              <ul className="space-y-2">
                {selectedService.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-neutral-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const sId = selectedService.id;
                  setSelectedService(null);
                  onOpenBooking(sId);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
              >
                Book This Treatment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
