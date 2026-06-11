// Single source of truth for all school-wide data.
// Import from this file everywhere. Never hardcode these values in pages.

export const SCHOOL_INFO = {
  name: "Hanchinmani School",

  address: {
    display: "Dharwad Road, Hubballi, Karnataka 580002",
    city: "Hubballi",
    state: "Karnataka",
    pincode: "580002",
    mapsQuery: "Dharwad+Road,+Hubballi,+Karnataka+580002",
    plusCode: "CX8W+QP4",
    googleMapsLink: "https://maps.app.goo.gl/BhrD1Sm97A9A8kSq9",
    embedSrc: "https://maps.google.com/maps?q=Dharwad+Road,+Hubballi,+Karnataka+580002&output=embed"
  },

  contact: {
    phone: "0836-2463232 / 0836-2463234",
    mobile: "6361120816 / 9019806938 / 9019861347",
    email: "hanchinmani.school@gmail.com",
    officeHours: "Monday - Saturday: 8:00 AM - 4:00 PM"
  },

  tagline: "Nurturing Minds, Building Futures",
  website: "https://hanchinmanicbseschool.com"
} as const;

export type SchoolInfo = typeof SCHOOL_INFO;
