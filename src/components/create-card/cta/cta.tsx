import { Input as HeroUIInput, Radio, RadioGroup } from "@heroui/react";
import { CardFormData } from "../../../types/card";
import { useState } from "react";
import Input from "../../input";
// import Input from "../../input";

interface ICta {
  formData: CardFormData;
  handleChange: (e: any) => void;
}

export default function CTA({ formData, handleChange }: ICta) {
  const [appointType, setAppointType] = useState("booking-link");

  return (
    <div className="space-y-6 py-4">
      <RadioGroup
        label="Appointment Type"
        orientation="horizontal"
        value={appointType}
        onValueChange={setAppointType}
        size="sm"
        classNames={{
          wrapper: "flex space-x-4 font-normal",
          label: "text-gray-700 text-sm",
        }}
      >
        <Radio value="booking-link">Booking Link</Radio>
        <Radio value="call-to-action">Call-to-Action</Radio>
      </RadioGroup>

      {appointType === "booking-link" ? (
        <HeroUIInput
          label="Calendly Link"
          name="calendlyLink"
          labelPlacement="outside"
          value={formData.calendlyLink}
          onChange={handleChange}
          placeholder="username"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-base font-normal">
                https://calendly.com/
              </span>
            </div>
          }
          classNames={{
            mainWrapper:
              "w-full rounded-lg placeholder:text-foreground-400 mt-6",
            inputWrapper: "border border-gray-300 rounded-lg",
            description: "text-gray-500 text-sm mt-1 font-normal",
            input: "text-base",
            label: "!text-gray-700",
          }}
          description="Add your Calendly link to allow visitors to schedule meetings with you"
        />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ctaLink"
              className="text-sm font-medium text-gray-700"
            >
              Custom CTA URL
            </label>

            <span className="text-foreground-500 text-sm font-normal mb-1">
              Add a custom call-to-action button with your own URL and label
            </span>

            <Input
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              placeholder="https://example.com/contact"
              className="flex-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="ctaLink"
              className="text-sm font-medium text-gray-700"
            >
              Custom CTA Label
            </label>

            <span className="text-foreground-500 text-sm font-normal mb-1">
              Add your custom call-to-action label to the button. i.e., Our
              Service, Products, Event, etc. Keep it shorts.
            </span>

            <Input
              name="ctaLabel"
              value={formData.ctaLabel}
              onChange={handleChange}
              placeholder="Call To Action"
              className="flex-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}
