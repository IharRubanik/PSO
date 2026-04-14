"use client";

import { useState, useCallback } from "react";

interface PhoneInputProps {
  className?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
}

function formatPhone(digits: string): string {
  const d = digits.slice(0, 10);
  let result = "+7";
  if (d.length > 0) result += ` (${d.slice(0, 3)}`;
  if (d.length >= 3) result += `) ${d.slice(3, 6)}`;
  if (d.length >= 6) result += `-${d.slice(6, 8)}`;
  if (d.length >= 8) result += `-${d.slice(8, 10)}`;
  return result;
}

export function PhoneInput({ className, name = "phone", required, placeholder = "+7 (___) ___-__-__" }: PhoneInputProps) {
  const [value, setValue] = useState("");
  const [digits, setDigits] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    // Remove leading 7 or 8 if user types full number
    let clean = raw;
    if (clean.startsWith("7") || clean.startsWith("8")) {
      clean = clean.slice(1);
    }
    clean = clean.slice(0, 10);
    setDigits(clean);
    setValue(clean.length > 0 ? formatPhone(clean) : "");
  }, []);

  const handleFocus = useCallback(() => {
    if (!value) {
      setValue("+7 ");
    }
  }, [value]);

  const handleBlur = useCallback(() => {
    if (digits.length === 0) {
      setValue("");
    }
  }, [digits]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && digits.length > 0) {
      e.preventDefault();
      const newDigits = digits.slice(0, -1);
      setDigits(newDigits);
      setValue(newDigits.length > 0 ? formatPhone(newDigits) : "+7 ");
    }
  }, [digits]);

  return (
    <input
      type="tel"
      name={name}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      inputMode="numeric"
      required={required}
    />
  );
}
