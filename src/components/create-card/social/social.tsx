import { Input } from "@heroui/react";
import { CardFormData } from "../../../types/card";

interface ISocial {
  formData: CardFormData;
  handleSocialChange: (e: any) => void;
}

export default function Social({ formData, handleSocialChange }: ISocial) {
  return (
    <div className="space-y-12 py-4">
      <Input
        label="LinkedIn URL"
        name="linkedin"
        labelPlacement="outside"
        value={formData.socialLinks.linkedin}
        onChange={handleSocialChange}
        placeholder="your-profile"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-base font-normal">
              https://linkedin.com/in/
            </span>
          </div>
        }
        classNames={{
          mainWrapper: "w-full rounded-lg placeholder:text-foreground-400",
          inputWrapper: "border border-gray-300 rounded-lg",
          description: "text-gray-500 text-sm mt-1 font-normal",
          input: "text-base",
          label: "!text-gray-700",
        }}
      />

      <Input
        label="Twitter URL"
        name="twitter"
        labelPlacement="outside"
        value={formData.socialLinks.twitter}
        onChange={handleSocialChange}
        placeholder="username"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-base font-normal">
              https://twitter.com/
            </span>
          </div>
        }
        classNames={{
          mainWrapper: "w-full rounded-lg placeholder:text-foreground-400",
          inputWrapper: "border border-gray-300 rounded-lg",
          description: "text-gray-500 text-sm mt-1 font-normal",
          input: "text-base",
          label: "!text-gray-700",
        }}
      />

      <Input
        label="Facebook URL"
        name="facebook"
        labelPlacement="outside"
        value={formData.socialLinks.facebook}
        onChange={handleSocialChange}
        placeholder="username"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-base font-normal">
              https://facebook.com/
            </span>
          </div>
        }
        classNames={{
          mainWrapper: "w-full rounded-lg placeholder:text-foreground-400",
          inputWrapper: "border border-gray-300 rounded-lg",
          description: "text-gray-500 text-sm mt-1 font-normal",
          input: "text-base",
          label: "!text-gray-700",
        }}
      />

      <Input
        label="YouTube URL"
        name="youtube"
        labelPlacement="outside"
        value={formData.socialLinks.youtube}
        onChange={handleSocialChange}
        placeholder="channelname"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-base font-normal">
              https://youtube.com/@
            </span>
          </div>
        }
        classNames={{
          mainWrapper: "w-full rounded-lg placeholder:text-foreground-400",
          inputWrapper: "border border-gray-300 rounded-lg",
          description: "text-gray-500 text-sm mt-1 font-normal",
          input: "text-base",
          label: "!text-gray-700",
        }}
      />

      <Input
        label="Instagram URL"
        name="instagram"
        labelPlacement="outside"
        value={formData.socialLinks.instagram}
        onChange={handleSocialChange}
        placeholder="username"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-base font-normal">
              https://instagram.com/
            </span>
          </div>
        }
        classNames={{
          mainWrapper: "w-full rounded-lg placeholder:text-foreground-400",
          inputWrapper: "border border-gray-300 rounded-lg",
          description: "text-gray-500 text-sm mt-1 font-normal",
          input: "text-base",
          label: "!text-gray-700",
        }}
      />

      <Input
        label="Tiktok URL"
        name="tiktok"
        labelPlacement="outside"
        value={formData.socialLinks.tiktok}
        onChange={handleSocialChange}
        placeholder="username"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-base font-normal">
              https://tiktok.com/@
            </span>
          </div>
        }
        classNames={{
          mainWrapper: "w-full rounded-lg placeholder:text-foreground-400",
          inputWrapper: "border border-gray-300 rounded-lg",
          description: "text-gray-500 text-sm mt-1 font-normal",
          input: "text-base",
          label: "!text-gray-700",
        }}
      />
    </div>
  );
}
