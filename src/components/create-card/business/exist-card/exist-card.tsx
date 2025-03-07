import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface IExistCard {
  onOpen: () => void;
}

export default function ExistCard({ onOpen }: IExistCard) {
  return (
    <div className="my-4">
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-col items-center font-normal text-gray-400 px-3 justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg"
      >
        <Icon icon="lucide:upload" className="size-12" />
        <span className="text-gray-500 mt-3">
          Drop your business card image here or click to upload
        </span>
        <span className="text-xs mt-2">Supports JPG, PNG, PDF (max 5MB)</span>
      </button>
    </div>
  );
}
