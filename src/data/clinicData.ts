import { IMAGES } from '../assets/images';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'preventive' | 'cosmetic' | 'restorative' | 'surgical' | 'orthodontic';
  shortDesc: string;
  fullDesc: string;
  duration?: string;
  benefits: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  reviewText: string;
  treatment: string;
  verified: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  src: string;
  fallbackSrc?: string;
  alt: string;
  description: string;
}

export const CLINIC_INFO = {
  name: "Smile Dental Care Clinic",
  tagline: "Premier Gentle & Aesthetic Dental Care in Islamabad",
  leadDoctor: {
    name: "Dr. Imtiaz Hussain",
    title: "Lead Dental Surgeon & Aesthetic Practitioner",
    qualifications: "B.Sc., B.D.S (RDS), C.A.E (UK)",
    experience: "12+ Years Clinical Excellence",
    bio: "Dr. Imtiaz Hussain is a respected dental surgeon dedicated to providing compassionate, gentle, and technically precise dental treatments. With qualifications including B.Sc., B.D.S (RDS) and UK certification in Aesthetic Dentistry (C.A.E UK), he emphasizes minimally invasive procedures, meticulous sterilization, and personalized treatment plans tailored to each patient's comfort.",
  },
  rating: 4.9,
  reviewCount: 363,
  phone: "0311-9798116",
  phoneFormatted: "+92 311 9798116",
  phoneTel: "+923119798116",
  whatsappNumber: "923119798116",
  whatsappUrl: "https://wa.me/923119798116?text=Hello%20Smile%20Dental%20Care%20Clinic%2C%20I%20would%20like%20to%20inquire%20about%20an%20appointment.",
  address: {
    suite: "Suit No. 02, 1st Floor",
    building: "Shahnawaz Plaza",
    street: "Sachal Sarmast Road",
    area: "G-11 Markaz",
    city: "Islamabad",
    postalCode: "44000",
    country: "Pakistan",
    full: "Suit No. 02, 1st Floor, Shahnawaz Plaza, Sachal Sarmast Road, G-11 Markaz, Islamabad, Pakistan",
  },
  coordinates: {
    lat: 33.668522,
    lng: 72.9970727,
  },
  googleMapsUrl: "https://maps.app.goo.gl/PbMU1uHniuuH5GMg6",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=33.668522,72.9970727",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 9:00 PM", isOpenDay: true },
    { days: "Sunday", time: "Emergency & Prior Appointment", isOpenDay: false },
  ],
  openHour: 10,
  closeHour: 21,
  email: "info@smiledentalcare.pk",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "scaling-polishing",
    title: "Teeth Scaling & Ultrasonic Polishing",
    category: "preventive",
    shortDesc: "Gentle removal of plaque, tartar, and coffee/tea stains for fresh breath and healthy gums.",
    fullDesc: "Our thorough scaling and ultrasonic polishing process removes stubborn calculus deposits and extrinsic stains without damaging tooth enamel. Regular cleanings prevent gingivitis, periodontitis, and gum recession.",
    duration: "30 - 45 mins",
    benefits: ["Prevents gum disease & bleeding", "Leaves teeth noticeably smoother", "Gentle ultrasonic technology", "Fresh breath confidence"],
  },
  {
    id: "composite-restoration",
    title: "Aesthetic Composite Fillings",
    category: "restorative",
    shortDesc: "Natural tooth-colored composite restorations seamlessly blended to match your natural shade.",
    fullDesc: "We use biocompatible, mercury-free composite resins matched perfectly to your natural enamel. Ideal for repairing decayed cavities, chipped edges, or replacing old amalgam metal fillings.",
    duration: "40 - 60 mins",
    benefits: ["Zero metal or mercury", "Shade-matched natural aesthetics", "Preserves healthy tooth structure", "Bonded directly for strength"],
  },
  {
    id: "root-canal",
    title: "Painless Root Canal Therapy (RCT)",
    category: "restorative",
    shortDesc: "Advanced rotary endodontic treatment to save infected or painful teeth comfortably.",
    fullDesc: "Modern root canal therapy at Smile Dental Care is virtually painless. Using rotary endodontics and apex locators, Dr. Imtiaz carefully clears infected pulp tissue, disinfects the root canal system, and seals it permanently.",
    duration: "1 - 2 visits",
    benefits: ["Immediate relief from acute toothache", "Saves your natural tooth from extraction", "Comfortable local anesthesia", "High long-term success rate"],
  },
  {
    id: "teeth-whitening",
    title: "Cosmetic Teeth Whitening",
    category: "cosmetic",
    shortDesc: "Safe, chairside whitening treatments to lift years of yellowing and discoloration.",
    fullDesc: "Brighten your smile up to several shades in a single clinical session. Our medical-grade whitening formulas protect enamel and minimize tooth sensitivity while delivering vibrant, camera-ready results.",
    duration: "45 - 60 mins",
    benefits: ["Safe on tooth enamel", "Noticeably brighter shade", "Removes deep dietary stains", "Custom sensitivity control"],
  },
  {
    id: "crowns-bridges",
    title: "Zirconia & Ceramic Crowns & Bridges",
    category: "restorative",
    shortDesc: "High-strength, lifelike ceramic and zirconia restorations for fractured or missing teeth.",
    fullDesc: "Engineered from monolithic zirconia and porcelain, our custom crowns protect heavily restored or post-root canal teeth, restoring full chewing power and harmonious aesthetics.",
    duration: "2 - 3 visits",
    benefits: ["Exceptional structural durability", "Natural light translucency", "Precision margin fit", "Protects weakened teeth"],
  },
  {
    id: "dental-implants",
    title: "Dental Implants & Tooth Replacement",
    category: "surgical",
    shortDesc: "The gold-standard permanent replacement for single or multiple missing teeth.",
    fullDesc: "Titanium dental implants integrate directly with your jawbone, offering a permanent foundation for realistic crowns that look, feel, and function just like natural teeth.",
    duration: "Multi-stage planned care",
    benefits: ["Permanent, non-slip solution", "Prevents jawbone deterioration", "No grinding of adjacent teeth", "Lifetime stability with proper care"],
  },
  {
    id: "orthodontics-aligners",
    title: "Braces & Clear Aligners",
    category: "orthodontic",
    shortDesc: "Straighten crooked teeth, close gaps, and correct bite misalignment for adults and teens.",
    fullDesc: "From discreet clear aligner trays to reliable orthodontic brackets, we formulate customized alignment plans that enhance facial symmetry and optimize long-term chewing function.",
    duration: "Comprehensive treatment plan",
    benefits: ["Custom digital treatment planning", "Discreet aligner alternatives", "Improves bite and jaw comfort", "Long-term aesthetic alignment"],
  },
  {
    id: "pediatric-dentistry",
    title: "Gentle Pediatric Dental Care",
    category: "preventive",
    shortDesc: "A warm, child-friendly environment ensuring fear-free dental visits for kids.",
    fullDesc: "We take extra time with our youngest patients to establish positive dental habits. Services include pit and fissure sealants, fluoride treatments, gentle cavity care, and space maintainers.",
    duration: "30 mins",
    benefits: ["Friendly, non-intimidating approach", "Prevents childhood dental anxiety", "Fluoride & sealant cavity shields", "Habit counseling for parents"],
  },
  {
    id: "wisdom-extractions",
    title: "Wisdom Tooth & Surgical Extractions",
    category: "surgical",
    shortDesc: "Safe, gentle removal of impacted wisdom teeth or non-restorable roots with rapid recovery.",
    fullDesc: "Impacted or misaligned wisdom teeth can cause severe pain, swelling, and crowding. Dr. Imtiaz uses minimally traumatic surgical extraction protocols to ensure swift healing and patient comfort.",
    duration: "45 mins",
    benefits: ["Minimally invasive surgical technique", "Effective localized anesthesia", "Detailed post-operative guidance", "Relief from jaw pressure & swelling"],
  },
  {
    id: "dentures",
    title: "Complete & Partial Dentures",
    category: "restorative",
    shortDesc: "Comfort-fit custom prosthetics designed for easy eating, speaking, and smiling.",
    fullDesc: "High-grade acrylic and flexible partial dentures crafted with meticulous impression techniques to ensure a snug, comfortable fit and natural facial profile support.",
    duration: "3 - 4 visits",
    benefits: ["Restores proper chewing function", "Supports facial muscle contours", "Lightweight, natural-looking materials", "Easy to clean and maintain"],
  },
  {
    id: "emergency-care",
    title: "Emergency Dental Care",
    category: "surgical",
    shortDesc: "Same-day urgent treatment for severe toothaches, broken teeth, trauma, and dental swelling.",
    fullDesc: "Dental emergencies require prompt intervention. Contact our direct clinic line or WhatsApp for rapid assessment, acute pain relief, and emergency stabilization.",
    duration: "Priority scheduling",
    benefits: ["Prompt emergency triage", "Immediate pain relief protocols", "Trauma and fracture stabilization", "Direct doctor contact via WhatsApp"],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Hamza Tariq",
    rating: 5,
    date: "1 month ago",
    reviewText: "Visited Smile Dental Care Clinic in G-11 Markaz for teeth scaling and polishing. Dr. Imtiaz Hussain is an absolute professional. The clinic is spotless, equipment is modern, and he explained every step of the procedure patiently. Highly recommended for anyone in Islamabad!",
    treatment: "Teeth Scaling & Polishing",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Ayesha Malik",
    rating: 5,
    date: "2 months ago",
    reviewText: "I had severe tooth pain and was terrified of root canal treatment. Dr. Imtiaz made the whole procedure completely painless! His gentle demeanor and clean clinic put me at ease right away. The relief was immediate.",
    treatment: "Root Canal Therapy",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Muhammad Usman",
    rating: 5,
    date: "3 months ago",
    reviewText: "Got composite fillings and cosmetic whitening done here. The results look so natural, you can't even tell where the filling is. Great location at Shahnawaz Plaza with easy parking. Reasonable pricing without any hidden charges.",
    treatment: "Cosmetic Fillings & Whitening",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Zainab Farooq",
    rating: 5,
    date: "4 months ago",
    reviewText: "Took my 8-year-old daughter here for a checkup. Dr. Imtiaz was so gentle and friendly with her, she didn't cry at all! Usually children hate dentists, but she was smiling the entire time. Very thankful.",
    treatment: "Pediatric Dental Care",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Bilal Ahmed Khan",
    rating: 5,
    date: "5 months ago",
    reviewText: "Best dental clinic in G-11 Islamabad. Meticulous sterilization standards—all instruments were opened in front of me from sterile pouches. The crown fit was perfect on the first try. Five stars well deserved.",
    treatment: "Zirconia Crown",
    verified: true,
  },
];

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: "g-1",
    title: "Advanced Operatory Suite",
    category: "Clinic Facility",
    src: IMAGES.clinicHero,
    fallbackSrc: "/images/clinic_hero.jpg",
    alt: "Modern operatory dental chair and digital diagnostic equipment at Smile Dental Care Clinic",
    description: "State-of-the-art dental chair featuring ergonomic cushioning and digital intraoral monitors for comprehensive patient diagnosis.",
  },
  {
    id: "g-2",
    title: "Patient Consultation",
    category: "Doctor & Care",
    src: IMAGES.doctorConsultation,
    fallbackSrc: "/images/doctor_consultation.jpg",
    alt: "Dr. Imtiaz Hussain explaining dental procedure to patient during consultation",
    description: "Personalized consultations where treatment options, digital x-rays, and procedures are thoroughly explained prior to treatment.",
  },
  {
    id: "g-3",
    title: "Cosmetic Smile Enhancement",
    category: "Smile Transformations",
    src: IMAGES.cosmeticSmile,
    fallbackSrc: "/images/cosmetic_smile.jpg",
    alt: "Healthy bright smile after cosmetic dental treatment",
    description: "Natural-looking cosmetic smile restorations focusing on harmony, enamel protection, and long-lasting brightness.",
  },
  {
    id: "g-4",
    title: "Ultrasonic Scaler & Sterile Trays",
    category: "Hygiene & Technology",
    src: IMAGES.dentalHygiene,
    fallbackSrc: "/images/dental_hygiene.jpg",
    alt: "Sterile dental instruments and gentle ultrasonic scaler in treatment room",
    description: "Autoclaved medical-grade instruments and gentle ultrasonic scalers adhering to international infection control protocols.",
  },
  {
    id: "g-5",
    title: "Reception & Patient Lounge",
    category: "Clinic Facility",
    src: IMAGES.clinicLounge,
    fallbackSrc: "/images/clinic_lounge.jpg",
    alt: "Relaxing reception lounge at Smile Dental Care Clinic Islamabad",
    description: "A calm, comfortable environment designed to reduce dental apprehension and ensure a serene patient experience.",
  },
];

export const CLINIC_PILLARS = [
  {
    title: "UK-Certified Clinical Leadership",
    desc: "Headed by Dr. Imtiaz Hussain, B.Sc., B.D.S (RDS), C.A.E (UK), bringing international aesthetic standards and evidence-based protocols to every treatment.",
  },
  {
    title: "Hospital-Grade Sterilization",
    desc: "Multi-stage autoclaving, single-use barrier covers, and instrument packs unsealed directly in front of each patient for absolute infection control.",
  },
  {
    title: "Pain-Free Gentle Dentistry",
    desc: "Computerized anesthetic delivery, gentle ultrasonic tools, and empathetic pacing designed specifically to put nervous patients at total ease.",
  },
  {
    title: "Prime G-11 Markaz Location",
    desc: "Conveniently situated at Suit 02, 1st Floor, Shahnawaz Plaza on Sachal Sarmast Road, with ample parking and accessibility across Islamabad.",
  },
];
