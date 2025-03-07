import { CardFormData } from "../types/card";

export const DEFAULT_CARD_DATA: CardFormData = {
  firstName: "",
  lastName: "",
  accreditations: "",
  companyName: "",
  jobTitle: "",
  department: "",
  companySlogan: "",
  phoneNumber: "",
  emailAddress: "",
  websiteUrl: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  sectionTitle: "About Me",
  photo: null,
  color: "#4299e1",
  tagline: "",
  about: "",
  isPublic: true,
  calendlyLink: "",
  ctaLink: "",
  ctaLabel: "",
  socialLinks: {
    facebook: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    instagram: "",
    tiktok: "",
  },
};

export const BRAND_THEME = [
  "theme-default",
  "theme-redPrimary",
  "theme-bluePrimary",
  "theme-orange",
  "theme-yellow",
  "theme-brown",
  "theme-green",
  "theme-teal",
  "theme-blueSecondary",
  "theme-indigo",
  "theme-pink",
  "theme-redSecondary",
  "theme-grayPrimary",
  "theme-graySecondary",
];

export const BRAND_COLORS = [
  {
    theme: "theme-default",
    color: "#4299e1",
  },
  {
    theme: "theme-redPrimary",
    color: "#f56565",
  },
  {
    theme: "theme-bluePrimary",
    color: "#6e51f0",
  },
  {
    theme: "theme-orange",
    color: "#ed8936",
  },
  {
    theme: "theme-yellow",
    color: "#ecc94b",
  },
  {
    theme: "theme-brown",
    color: "#9c6644",
  },
  {
    theme: "theme-green",
    color: "#48bb78",
  },
  {
    theme: "theme-teal",
    color: "#38b2ac",
  },
  {
    theme: "theme-blueSecondary",
    color: "#3182ce",
  },
  {
    theme: "theme-indigo",
    color: "#6b46c1",
  },
  {
    theme: "theme-pink",
    color: "#d53f8c",
  },
  {
    theme: "theme-redSecondary",
    color: "#e53e3e",
  },
  {
    theme: "theme-grayPrimary",
    color: "#2d3748",
  },
  {
    theme: "theme-graySecondary",
    color: "#718096",
  },
];

// export const BRAND_COLORS = [
//   "#4299e1", // blue
//   "#f56565", // red
//   "#ed8936", // orange
//   "#ecc94b", // yellow
//   "#9c6644", // brown
//   "#48bb78", // green
//   "#38b2ac", // teal
//   "#3182ce", // blue
//   "#6b46c1", // indigo
//   "#d53f8c", // pink
//   "#e53e3e", // red
//   "#2d3748", // dark gray
//   "#718096", // gray
// ];
