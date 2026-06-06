"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      expand
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          fontFamily: "'Tajawal', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 500,
          borderRadius: "0.625rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          padding: "14px 18px",
          minWidth: "320px",
        },
        classNames: {
          success: "!bg-[#1e6f35] !text-white !border-[#17542a]",
          error: "!bg-[#b91c1c] !text-white !border-[#991b1b]",
          warning: "!bg-[#C07A1A] !text-white !border-[#a06415]",
          info: "!bg-[#2C3E50] !text-white !border-[#1a2a38]",
          closeButton: "!bg-white/20 !text-white hover:!bg-white/40 !border-0",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
