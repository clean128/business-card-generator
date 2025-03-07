import { Tab, Tabs } from "@heroui/react";
import { CardFormData } from "../../../types/card";
import ManualEntry from "./manual-entry/manual-entry";
import ExistCard from "./exist-card/exist-card";

interface IBusinessProps {
  formData: CardFormData;
  onOpen: () => void;
  handleChange: (e: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<CardFormData>>;
}

export default function Business({
  formData,
  onOpen,
  handleChange,
  setFormData,
}: IBusinessProps) {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        color="primary"
        variant="underlined"
        aria-label="Business Tabs"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit text-base px-3 h-12 text-gray-500",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        <Tab key="manual-entry" title="Manual Entry">
          <ManualEntry
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        </Tab>
        <Tab key="upload-card" title="Upload Card">
          <ExistCard onOpen={onOpen} />
        </Tab>
      </Tabs>
    </div>
  );
}
