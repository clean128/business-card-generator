import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { downloadCardImage } from "../../utils/vcard";

interface ActionButtonsProps {
  isLoading: boolean;
  cardRef?: React.RefObject<HTMLDivElement>;
}

export function ActionButtons({ isLoading, cardRef }: ActionButtonsProps) {
  const handleDownloadImage = () => {
    if (!cardRef?.current) return;
    downloadCardImage(cardRef);
  };

  return (
    <div className="flex flex-col justify-end gap-2">
      <div className="flex flex-1 gap-4">
        <Button
          type="button"
          isLoading={isLoading}
          onPress={handleDownloadImage}
          startContent={<Icon icon="octicon:image-24" className="w-5 h-5" />}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg w-full text-base"
        >
          Download Image
        </Button>
        <Button
          type="button"
          isLoading={isLoading}
          startContent={<Icon icon="uil:user-square" className="w-5 h-5" />}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg w-full text-base"
        >
          Download vCard
        </Button>
      </div>
      <div className="flex flex-1 gap-4">
        <Button
          type="submit"
          isLoading={isLoading}
          startContent={<Icon icon="lucide:save" className="w-5 h-5" />}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg w-full text-base"
        >
          Save Card
        </Button>
        <Button
          type="button"
          isLoading={isLoading}
          startContent={<Icon icon="iconoir:share-ios" className="w-5 h-5" />}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full text-base"
        >
          Share
        </Button>
        <Button
          type="button"
          isLoading={isLoading}
          startContent={<Icon icon="mage:dashboard" className="w-5 h-5" />}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg w-full text-base"
        >
          Dashboard
        </Button>
      </div>
    </div>
  );
}
