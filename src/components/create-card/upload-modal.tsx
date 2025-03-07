import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface UploadModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadModal({
  isOpen,
  onOpenChange,
  fileInputRef,
  onFileUpload,
}: UploadModalProps) {
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Upload Business Card</ModalHeader>
            <ModalBody>
              <p className="mb-4">
                Upload an image of your existing business card to automatically
                extract information. Supported formats: JPG, PNG or WEBP (max.
                5MB)
              </p>
              <Button
                onPress={handleFileUpload}
                color="primary"
                startContent={<Icon icon="lucide:upload" />}
              >
                Select File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onFileUpload}
                className="hidden"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
