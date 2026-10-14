import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryPhoto } from '../data/clinicData';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SmartImage } from './SmartImage';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const openLightbox = (item: GalleryPhoto, index: number) => {
    setActivePhoto(item);
    setPhotoIndex(index);
  };

  const nextPhoto = () => {
    const nextIdx = (photoIndex + 1) % GALLERY_ITEMS.length;
    setPhotoIndex(nextIdx);
    setActivePhoto(GALLERY_ITEMS[nextIdx]);
  };

  const prevPhoto = () => {
    const prevIdx = (photoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setPhotoIndex(prevIdx);
    setActivePhoto(GALLERY_ITEMS[prevIdx]);
  };

  return (
    <section id="gallery" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Clinic Tour & Facilities
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Inside Smile Dental Care Clinic
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Take a look inside our modern clinical operatory, consultation suites, and hygienic sterilization facilities in G-11 Markaz Islamabad.
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => {
            const isLarge = index === 0;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(item, index)}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-neutral-200/80 bg-neutral-200 shadow-xs hover:shadow-md transition-all ${
                  isLarge ? 'md:col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                <SmartImage
                  src={item.src}
                  fallbackSrc={item.fallbackSrc}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  fallbackLabel={item.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[11px] font-semibold text-teal-300 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Caption below gallery */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Photographed on-site at Shahnawaz Plaza, G-11 Markaz, Islamabad · Click any image to view details
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 p-2 text-white hover:text-teal-300 bg-slate-900/60 rounded-full transition-colors z-10"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 text-white hover:text-teal-300 bg-slate-900/60 hover:bg-slate-900 rounded-full transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 text-white hover:text-teal-300 bg-slate-900/60 hover:bg-slate-900 rounded-full transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="rounded-xl overflow-hidden max-h-[70vh] flex items-center justify-center bg-black">
              <SmartImage
                src={activePhoto.src}
                fallbackSrc={activePhoto.fallbackSrc}
                alt={activePhoto.alt}
                className="max-h-[70vh] max-w-full object-contain"
                objectFit="contain"
                priority={true}
                fallbackLabel={activePhoto.title}
              />
            </div>
            <div className="mt-4 text-center text-white max-w-2xl px-4">
              <span className="text-xs text-teal-400 font-semibold">{activePhoto.category}</span>
              <h4 className="text-lg font-bold mt-1">{activePhoto.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
