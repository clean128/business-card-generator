import React from "react";
import { Switch } from "@heroui/react";
import { CardFormData } from "../../../types/card";
import { ColorPicker } from "../../color-picker";
import Input from "../../input";
import { PhotoUpload } from "../../photo-upload";

interface IProfile {
  formData: CardFormData;
  setFormData: React.Dispatch<React.SetStateAction<CardFormData>>;
}

export default function Profile({ formData, setFormData }: IProfile) {
  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
    const rootElement = document.getElementById("app-container");
    if (rootElement) {
      rootElement.style.backgroundColor = `${color}1f`;
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="mb-4">
        <Input
          name="cardName"
          label="Card Name"
          placeholder="e.g., john-smith-business-card"
          value={(formData.firstName + "-" + formData.lastName)
            .toLowerCase()
            .replace(/\s+/g, "-")}
          description="A unique identifier for your card's URL"
          readOnly
        />
      </div>

      <PhotoUpload
        value={formData.photo}
        onChange={(photo) => setFormData((prev) => ({ ...prev, photo }))}
        className="mb-6"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Card Visibility
        </label>
        <div className="flex items-center gap-4">
          <Switch
            isSelected={formData.isPublic}
            onValueChange={(isPublic) =>
              setFormData((prev) => ({ ...prev, isPublic }))
            }
          />
          <span>{formData.isPublic ? "Public" : "Private"}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {formData.isPublic
            ? "Your card will be visible in the public directory"
            : "Only people with the direct link can view your card"}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Brand Color
        </label>
        <ColorPicker value={formData.color} onChange={handleColorChange} />
      </div>
    </div>
  );
}
