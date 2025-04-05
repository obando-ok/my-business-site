// This page safely redirects any access to `/profile` toward the actual dashboard

import { redirect } from "next/navigation";

export default function RedirectToMission() {
  redirect("/profile/mission");
}
