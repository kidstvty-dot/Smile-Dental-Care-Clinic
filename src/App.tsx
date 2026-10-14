/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HighlightsStrip } from './components/HighlightsStrip';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { DoctorSection } from './components/DoctorSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndHours } from './components/LocationAndHours';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { FloatingActions } from './components/FloatingActions';
import { AdminPortalModal } from './components/AdminPortalModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedServiceId(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Top Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Key Metrics & Credentials Strip */}
        <HighlightsStrip />

        {/* 3. About Practice Section */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Comprehensive Dental Services */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* 5. Doctor Spotlight (Dr. Imtiaz Hussain) */}
        <DoctorSection onOpenBooking={() => handleOpenBooking()} />

        {/* 6. Why Choose Us & Hygiene Protocol */}
        <WhyChooseUs />

        {/* 7. Clinic Photo Gallery & Tour */}
        <GallerySection />

        {/* 8. Patient Reviews (4.9 Google Rating) */}
        <ReviewsSection />

        {/* 9. Location, Real-Time Status & Timings */}
        <LocationAndHours />

        {/* 10. Contact & Appointment Request Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Action Buttons (WhatsApp & Quick Call) */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={preselectedServiceId}
      />

      {/* Clinic Reception Staff Portal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
