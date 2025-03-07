export interface BusinessCard extends CardFormData {
  id: string;
  userId: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface CardFormData {
  firstName: string;
  lastName: string;
  accreditations: string;
  companyName: string;
  jobTitle: string;
  department: string;
  companySlogan: string;
  phoneNumber: string;
  emailAddress: string;
  websiteUrl: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  sectionTitle: string;
  photo: string | null;
  color: string;
  tagline: string;
  about: string;
  isPublic: boolean;
  calendlyLink: string;
  ctaLink: string;
  ctaLabel: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
  };
}
