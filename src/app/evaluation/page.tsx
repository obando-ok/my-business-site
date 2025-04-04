// src/app/evaluation/page.tsx
import EvaluationForm from "@/components/evaluation/EvaluationForm";

export default function EvaluationPage() {
  return (
    <main className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Self Evaluation</h1>
        <EvaluationForm />
      </div>
    </main>
  );
}
