"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

interface CallToActionButtonProps {
  label?: string;
  href?: string;
  size?: "default" | "lg" | "sm";
}

export default function CallToActionButton({
  label = "Begin Self Evaluation →",
  href = "/evaluation",
  size = "lg",
}: CallToActionButtonProps) {
  const router = useRouter();

  return (
    <Button size={size} onClick={() => router.push(href)}>
      {label}
    </Button>
  );
}
