import Input from "./input";
import { Input as HeroUIInput } from "@heroui/react";
import { BRAND_COLORS, BRAND_THEME } from "../constants/global";
import { useEffect, useState } from "react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [theme, setTheme] = useState("theme-default");

  useEffect(() => {
    document.documentElement.classList.remove(...BRAND_THEME);
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex gap-2 items-center">
      <HeroUIInput
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#HEX color"
        size="sm"
        className="max-w-[48px]"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#HEX color"
        className="max-w-[100px]"
      />
      <div className="flex flex-wrap gap-2">
        {BRAND_COLORS.map((item) => (
          <button
            key={item.color}
            type="button"
            className={`w-8 h-8 rounded-full hover:scale-110 transition duration-300 ${
              value === item.color ? `ring-2 ring-offset-2 ring-bgColor` : ""
            }`}
            style={{
              backgroundColor: item.color,
            }}
            onClick={() => {
              onChange(item.color);
              setTheme(item.theme);
            }}
            aria-label={`Select color ${item.color}`}
          />
        ))}
      </div>
    </div>
  );
}
