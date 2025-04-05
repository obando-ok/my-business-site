"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ReflectionModal({ trigger }: { trigger: React.ReactNode }) {
  const [reflection, setReflection] = useState("");

  const handleSubmit = () => {
    console.log("Submitted Reflection:", reflection);
    // TODO: send to Supabase
    setReflection("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
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
  );
}
