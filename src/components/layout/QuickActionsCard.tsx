"use client";

import {
  PencilLine,
  PlusCircle,
  CalendarCheck,
  BarChart,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function QuickActionsCard() {
  const [reflection, setReflection] = useState("");

  const handleSubmit = () => {
    console.log("Submitted Reflection:", reflection);
    setReflection("");
  };

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-orange-500 w-5 h-5" />
        <h2 className="text-lg font-semibold text-primary">Quick Actions</h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Reflect (Modal) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="w-full h-14 px-4 text-sm font-semibold justify-start items-center gap-2"
            >
              <PencilLine className="w-4 h-4 shrink-0" />
              Reflect
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>🧠 Start a Reflection</DialogTitle>
            </DialogHeader>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write about your day, your mindset, or a lesson learned..."
              className="min-h-[120px]"
            />
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={!reflection.trim()}>
                Save Reflection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Goal */}
        <Button
          onClick={() => console.log("Add goal")}
          variant="default"
          className="w-full h-14 px-4 text-sm font-semibold justify-start items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          Add Goal
        </Button>

        {/* Finish Day */}
        <Button
          onClick={() => console.log("Marked complete")}
          variant="default"
          className="w-full h-14 px-4 text-sm font-semibold justify-start items-center gap-2"
        >
          <CalendarCheck className="w-4 h-4 shrink-0" />
          Finish Day
        </Button>

        {/* Review */}
        <Button
          onClick={() => console.log("Weekly review")}
          variant="default"
          className="w-full h-14 px-4 text-sm font-semibold justify-start items-center gap-2"
        >
          <BarChart className="w-4 h-4 shrink-0" />
          Review
        </Button>
      </div>
    </>
  );
}
