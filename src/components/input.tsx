import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

export interface InputProps<T extends FieldValues>
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name?: Path<T>;
  register?: UseFormRegister<T>;
  label?: string;
  placeholder?: string;
  customRequired?: "required" | "optional" | "normal";
  customSize?: "sm" | "md" | "lg";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  className?: string;
  labelClass?: string;
  inputClass?: string;
}

export default function Input<T extends FieldValues>({
  name,
  register,
  label,
  onChange,
  customRequired = "normal",
  customSize = "md",
  value,
  description,
  placeholder,
  className,
  labelClass,
  inputClass,
  ...props
}: Readonly<InputProps<T>>) {
  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={name}
          className={clsx(
            "block text-sm font-medium text-gray-700 mb-1",
            labelClass
          )}
        >
          {label}
          <span>
            {customRequired === "required"
              ? " *"
              : customRequired === "optional"
              ? " Optional"
              : ""}
          </span>
        </label>
      ) : null}

      <input
        name={name}
        className={clsx(
          "w-full px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-foreground-400 placeholder:font-normal font-normal",
          customSize === "sm" && "text-sm py-1",
          customSize === "md" && "text-base py-2",
          customSize === "lg" && "text-lg py-3",
          inputClass
        )}
        placeholder={placeholder}
        {...(register && name && register(name))}
        {...(value && { value: value })}
        {...(onChange && { onChange: onChange })}
        {...props}
      />
      {description ? (
        <p className="mt-1 text-xs text-foreground-400 font-normal">
          {description}
        </p>
      ) : null}
    </div>
  );
}
