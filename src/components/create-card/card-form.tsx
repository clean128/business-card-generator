import { Tab, Tabs, useDisclosure } from "@heroui/react";
import React from "react";
import { useBusinessCardExtractor } from "../../hooks/use-business-card-extractor";
import { CardFormData } from "../../types/card";
import About from "./about/about";
import { ActionButtons } from "./action-buttons";
import Business from "./business/business";
import CTA from "./cta/cta";
import Profile from "./profile/profile";
import Social from "./social/social";
import { UploadModal } from "./upload-modal";

interface CardFormProps {
  formData: CardFormData;
  setFormData: React.Dispatch<React.SetStateAction<CardFormData>>;
  onSubmit: (data: CardFormData) => void;
  isLoading?: boolean;
  cardRef?: React.RefObject<HTMLDivElement>;
  handleDownloadVCard?: () => void;
}

export function CardForm({
  formData,
  onSubmit,
  isLoading = false,
  setFormData,
  cardRef,
  handleDownloadVCard,
}: CardFormProps) {
  const [activeTab, setActiveTab] = React.useState("profile");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { extractBusinessCard } = useBusinessCardExtractor();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  async function handleImageUpload(file: File) {
    const cardData = await extractBusinessCard(file);

    // Update your form data with the extracted information
    setFormData((prev) => ({
      ...prev,
      firstName: cardData.firstName || "",
      lastName: cardData.lastName || "",
      accreditations: cardData.accreditations || "",
      jobTitle: cardData.jobTitle || "",
      companyName: cardData.companyName || "",
      phoneNumber: cardData.phoneNumber || "",
      emailAddress: cardData.emailAddress || "",
      websiteUrl: cardData.websiteUrl || "",
      address: {
        street: cardData.address.street || "",
        city: cardData.address.city || "",
        state: cardData.address.state || "",
        zip: cardData.address.zip || "",
        country: cardData.address.country || "",
      },
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Tabs
        selectedKey={activeTab}
        color="primary"
        onSelectionChange={(key) => setActiveTab(key as string)}
        aria-label="Card Information Tabs"
        fullWidth
      >
        <Tab
          key="profile"
          title="Profile"
          className="py-5 sm:text-base sm:font-medium"
        >
          <Profile formData={formData} setFormData={setFormData} />
        </Tab>

        <Tab
          key="business"
          title="Business"
          className="py-5 sm:text-base sm:font-medium"
        >
          <Business
            formData={formData}
            onOpen={onOpen}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        </Tab>

        <Tab
          key="social"
          title="Social"
          className="py-5 sm:text-base sm:font-medium"
        >
          <Social formData={formData} handleSocialChange={handleSocialChange} />
        </Tab>

        <Tab
          key="about"
          title="About"
          className="py-5 sm:text-base sm:font-medium"
        >
          <About formData={formData} handleChange={handleChange} />
        </Tab>

        <Tab key="cta" title="CTA" className="py-5 sm:text-base sm:font-medium">
          <CTA formData={formData} handleChange={handleChange} />
        </Tab>
      </Tabs>

      <ActionButtons
        isLoading={isLoading}
        cardRef={cardRef}
        handleDownloadVCard={handleDownloadVCard}
      />

      <UploadModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        fileInputRef={fileInputRef}
        onFileUpload={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageUpload(file);
          }
        }}
      />
    </form>
  );
}
