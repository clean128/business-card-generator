import React from "react";
import { Icon } from "@iconify/react";
import { ImageCropper } from "./image-cropper";
import clsx from "clsx";

interface PhotoUploadProps {
  value: string | null;
  onChange: (photo: string | null) => void;
  className?: string;
}

export function PhotoUpload({
  value,
  onChange,
  className = "",
}: PhotoUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = React.useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = React.useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    // Check file type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Only JPG, PNG, or WEBP files are allowed");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setTempImage(event.target?.result as string);
      setIsCropperOpen(true);
    };
    reader.readAsDataURL(file);

    // Reset the input value so the same file can be selected again
    e.target.value = "";
  };

  const handleCropComplete = (croppedImage: string) => {
    onChange(croppedImage);
    setTempImage(null);
    setIsCropperOpen(false);
  };

  const handleCropCancel = () => {
    setTempImage(null);
    setIsCropperOpen(false);
  };

  const handleDelete = () => {
    onChange(null);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1 text-gray-700">
        Profile Photo
      </label>
      <div className="flex flex-col items-center">
        <div className="relative">
          <div
            className={clsx(
              "relative w-24 h-24 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer overflow-hidden",
              value ? "hover:ring-4 hover:ring-gray-500" : ""
            )}
            onClick={handleClick}
          >
            {value ? (
              <div className="relative group">
                <img
                  src={value}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ">
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full"></div>
                  <button
                    className="relative z-10 p-2 text-white hover:text-blue-200 transition-colors font-medium"
                    aria-label="Change photo"
                  >
                    <Icon icon="streamline:camera-1" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Icon icon="lucide:camera" className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">Add Photo</span>
              </div>
            )}
          </div>

          {value && (
            <button
              type="button"
              className="bg- absolute -top-2.5 -right-3 rounded-full size-6 bg-red-600 hover:bg-red-700 items-center justify-center flex text-white"
              onClick={handleDelete}
              aria-label="Remove photo"
            >
              <Icon icon="material-symbols:close-rounded" className="w-4 h-4" />
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-xs text-gray-500 mt-2">
          Click to add or change profile photo (JPG, PNG or WEBP, max. 5MB)
        </p>
      </div>

      {tempImage && (
        <ImageCropper
          image={tempImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          isOpen={isCropperOpen}
        />
      )}
    </div>
  );
}
