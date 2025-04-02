// src/components/layout/ContactSection.tsx
"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form Submitted", data);
        resolve(data);
      }, 1000);
    });
  };

  return (
    <section id="contact" className="bg-background py-24 px-6 border-t border-border">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Let’s Work Together
        </h2>
        <p className="text-muted-foreground mb-10">
          Reach out to get started, ask questions, or collaborate on something great.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">Name is required</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
          </div>

          <div>
            <textarea
              rows={5}
              placeholder="Your message..."
              {...register("message", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            {errors.message && <p className="text-sm text-red-500 mt-1">Message is required</p>}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting || isSubmitSuccessful}
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitSuccessful ? "Message Sent!" : isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </div>
    </section>
  );
}