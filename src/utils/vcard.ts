import vCard from "vcf";
import { BusinessCard } from "../types/card";
import html2canvas from "html2canvas";

export function generateVCard(card: BusinessCard): string {
  const vcard = new vCard();

  // Add basic information
  vcard.add("fn", card.firstName + " " + card.lastName);
  vcard.add("title", "business-card-" + card.id);
  vcard.add("org", card.companyName);

  // Add contact information
  if (card.phoneNumber) {
    vcard.add("tel", card.phoneNumber);
  }

  if (card.emailAddress) {
    vcard.add("email", card.emailAddress);
  }

  if (card.websiteUrl) {
    vcard.add("url", card.websiteUrl);
  }

  if (card.address) {
    vcard.add(
      "adr",
      card.address.street +
        ", " +
        card.address.city +
        ", " +
        card.address.state +
        ", " +
        card.address.zip +
        ", " +
        card.address.country
    );
  }

  // Add photo if available
  if (card.photo) {
    // Extract base64 data from data URL
    const photoData = card.photo.split(",")[1];
    vcard.add("photo", photoData);
  }

  // Add note with about information
  if (card.about) {
    vcard.add("note", card.about);
  }

  return vcard.toString();
}

export function downloadVCard(card: BusinessCard) {
  const vcardString = generateVCard(card);
  const blob = new Blob([vcardString], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${card.id.toLowerCase().replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadCardImage(
  cardRef: React.RefObject<HTMLDivElement>
) {
  if (!cardRef.current) return;

  try {
    // Create canvas from the card element
    const canvas = await html2canvas(cardRef.current, {
      scale: 2, // Higher quality
      useCORS: true, // Enable CORS for images
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob as Blob);
        },
        "image/png",
        1.0
      );
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `business-card.png`.toLowerCase().replace(/\s+/g, "-");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating card image:", error);
  }
}
