"use client";

import { useState } from "react";
import { useField } from "formik";
import Image from "next/image";

interface AppInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  className?: string;
  defaultValue?: string;
  showPasswordToggle?: boolean;
  icon?: string; // Icon file path
  // Props for use without Formik
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Helper component that uses Formik
function FormikInput({
  name,
  label,
  placeholder,
  type = "text",
  className = "",
  defaultValue,
  showPasswordToggle = false,
  icon,
  showPassword,
  setShowPassword,
}: Omit<AppInputProps, "value" | "onChange"> & {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;
  const inputType =
    type === "password" && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  const baseInputClasses =
    "mt-1 block w-full rounded-md border text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white sm:text-base";
  const errorClasses =
    "border-error focus:border-error focus:ring-error";
  const normalClasses =
    "border-gray-300 focus:border-primary-500 focus:ring-primary-500";
  
  // Adjust padding based on icon presence
  const paddingClasses = icon
    ? "pl-10 pr-3 py-2 sm:pl-10 sm:pr-4 sm:py-2.5"
    : "px-3 py-2 sm:px-4 sm:py-2.5";

  const inputClassName = `${baseInputClasses} ${paddingClasses} ${
    hasError ? errorClasses : normalClasses
  } ${className}`;

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 sm:text-base"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none sm:left-4">
            <Image 
              src={icon} 
              alt="" 
              width={20} 
              height={20} 
              className="h-5 w-5" 
              unoptimized
            />
          </div>
        )}
        <input
          {...field}
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={inputClassName}
          defaultValue={defaultValue}
        />
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none sm:right-4"
          >
            {showPassword ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {hasError && (
        <div className="mt-1 text-sm text-error sm:text-base">
          {meta.error}
        </div>
      )}
    </div>
  );
}

// Regular input component (without Formik)
function RegularInput({
  name,
  label,
  placeholder,
  type = "text",
  className = "",
  defaultValue,
  showPasswordToggle = false,
  icon,
  value,
  onChange,
  showPassword,
  setShowPassword,
}: AppInputProps & {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) {
  const inputType =
    type === "password" && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  const baseInputClasses =
    "mt-1 block w-full rounded-md border text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white sm:text-base";
  const normalClasses =
    "border-gray-300 focus:border-primary-500 focus:ring-primary-500";
  
  // Adjust padding based on icon presence
  const paddingClasses = icon
    ? "pl-10 pr-3 py-2 sm:pl-10 sm:pr-4 sm:py-2.5"
    : "px-3 py-2 sm:px-4 sm:py-2.5";

  const inputClassName = `${baseInputClasses} ${paddingClasses} ${normalClasses} ${className}`;

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 sm:text-base"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none sm:left-4">
            <Image 
              src={icon} 
              alt="" 
              width={20} 
              height={20} 
              className="h-5 w-5" 
              unoptimized
            />
          </div>
        )}
        <input
          name={name}
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={inputClassName}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none sm:right-4"
          >
            {showPassword ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AppInput(props: AppInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  // If value or onChange is provided, use regular input (not Formik)
  if (props.value !== undefined || props.onChange !== undefined) {
    return (
      <RegularInput
        {...props}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    );
  }
  
  // Otherwise, try to use Formik
  return (
    <FormikInput
      {...props}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />
  );
}
