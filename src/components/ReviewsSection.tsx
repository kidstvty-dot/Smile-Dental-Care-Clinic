import React from 'react';
import { CLINIC_INFO, REVIEWS } from '../data/clinicData';
import { Star, CheckCircle, ExternalLink, MessageSquare } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Verified Patient Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Rated 4.9 Stars on Google Maps
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Real feedback from patients treated at Smile Dental Care Clinic in G-11 Markaz, Islamabad.
          </p>

          {/* Rating Summary Bar */}
          <div className="pt-2 flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xl font-bold text-slate-900">4.9</span>
            </div>
            <span className="text-sm text-slate-500">
              Based on {CLINIC_INFO.reviewCount} public Google reviews
            </span>
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors underline underline-offset-4"
            >
              <span>View all on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 shadow-xs hover:border-teal-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{review.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{review.reviewText}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                    <span>{review.author}</span>
                    {review.verified && (
                      <span title="Verified Patient" className="inline-flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 inline" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {review.treatment}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Google Review
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action for reviews */}
        <div className="mt-12 text-center">
          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-neutral-100 text-xs font-semibold transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <span>Read More Reviews or Leave a Review on Google Maps</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
