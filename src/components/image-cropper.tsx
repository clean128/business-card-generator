import React from "react";
import Cropper from "react-easy-crop";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
} from "@heroui/react";

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function ImageCropper({
  image,
  onCropComplete,
  onCancel,
  isOpen,
}: ImageCropperProps) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const getCroppedImg = (imageSrc: string, pixelCrop: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return reject(new Error("Could not get canvas context"));
        }

        // Set canvas size to the desired output size (circle)
        const size = Math.min(pixelCrop.width, pixelCrop.height);
        canvas.width = size;
        canvas.height = size;

        // Draw circular mask
        ctx.beginPath();
        ctx.rect(0, 0, size, size);
        ctx.clip();

        // Draw the image
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          size,
          size
        );

        resolve(canvas.toDataURL("image/png"));
      };
      image.onerror = () => reject(new Error("Could not load image"));
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Crop Profile Photo</ModalHeader>
            <ModalBody>
              <div className="relative h-[300px] w-full">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  onCropChange={onCropChange}
                  onZoomChange={onZoomChange}
                  onCropComplete={onCropCompleteHandler}
                />
              </div>
              <div className="mt-4">
                <p className="mb-2">Zoom</p>
                <Slider
                  aria-label="Zoom"
                  value={zoom}
                  onChange={(value) => setZoom(value as number)}
                  step={0.1}
                  maxValue={5}
                  minValue={1}
                  className="max-w-full"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={() => {
                  onClose();
                  onCancel();
                }}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  createCroppedImage();
                  onClose();
                }}
                className="rounded-lg"
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
