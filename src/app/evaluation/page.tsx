// src/app/evaluation/page.tsx
import EvaluationForm from "@/components/evaluation/EvaluationForm";

export default function EvaluationPage() {
  return (
    <main className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <EvaluationForm />
      </div>
    </main>
  );
}
