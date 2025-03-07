import { useState } from "react";
import { Textarea } from "@heroui/react";
import { CardFormData } from "../../../types/card";
import Input from "../../input";

interface IAbout {
  formData: CardFormData;
  handleChange: (e: any) => void;
}

export default function About({ formData, handleChange }: IAbout) {
  const [aboutVal, setAboutVal] = useState(formData.about);
  return (
    <div className="space-y-4 py-4">
      <Input
        label="Section Title"
        name="sectionTitle"
        defaultValue={formData.sectionTitle}
        onChange={handleChange}
      />

      <div className="flex flex-col">
        <div className="flex justify-between items-center text-sm flex-1 mb-1">
          <span className="text-gray-700 font-medium">
            Short Bio, Company Description, Education, etc.
          </span>

          <span className="text-foreground-500 font-medium">{`${aboutVal.length}/250`}</span>
        </div>

        <Textarea
          disableAnimation
          disableAutosize
          isClearable
          name="about"
          value={formData.about}
          onValueChange={(val) => {
            setAboutVal(val);
            handleChange({ target: { name: "about", value: val } });
          }}
          isInvalid={aboutVal.length > 250}
          errorMessage="The description should be at least 255 characters long."
          placeholder="Share your professional background, expertise, or company mission. What makes you or your company unique?"
          classNames={{
            mainWrapper:
              "w-full rounded-lg placeholder:text-foreground-400 placeholder:font-normal",
            inputWrapper:
              "rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            input: "text-base font-normal resize-y min-h-[120px]",
          }}
        />
      </div>
    </div>
  );
}
