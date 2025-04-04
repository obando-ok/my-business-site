import { supabase } from "./supabaseClient";

/**
 * Check if milestone already exists, and save if new.
 * @returns true if newly unlocked
 */
export async function checkAndSaveMilestone(
  userId: string,
  dayCount: number,
  label: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("milestones")
    .select("id")
    .eq("user_id", userId)
    .eq("day_count", dayCount)
    .single();

  if (!data && !error) {
    await supabase.from("milestones").insert([
      {
        user_id: userId,
        day_count: dayCount,
        label,
      },
    ]);
    return true;
  }

  return false;
}
