"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

const focusThemes = [
  "Mindful Execution",
  "Relentless Discipline",
  "Focused Aggression",
  "Consistent Mastery",
  "Embrace the Suck",
  "Purpose Over Pleasure",
  "Gratitude & Grit",
  "Controlled Chaos",
  "Move with Intention",
];

function getFocusThemeByDate() {
  const today = new Date().toDateString();
  const hash = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return focusThemes[hash % focusThemes.length];
}

export default function FocusCard() {
  const router = useRouter();
  const pathname = usePathname();
  const isOnMissionPage = pathname === "/profile/mission";

  const theme = useMemo(() => getFocusThemeByDate(), []);

  const goToMissionControl = () => {
    if (isOnMissionPage) return;
    const missionSection = document.getElementById("mission");
    missionSection ? missionSection.scrollIntoView({ behavior: "smooth" }) : router.push("/profile/mission");
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4 text-primary">🤖 AI-Powered Focus</h2>
      <p className="text-sm text-muted-foreground mb-2">
        Today’s theme is: <span className="font-semibold text-foreground">{`“${theme}”`}</span>
      </p>
      <p className="text-xs text-muted-foreground italic mb-4">
        “Discipline is choosing what you want most over what you want now.”
      </p>
      {!isOnMissionPage && (
        <Button onClick={goToMissionControl}>Go to Mission Control</Button>
      )}
    </>
  );
}
