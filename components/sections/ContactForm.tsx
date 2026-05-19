"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Please share a little more detail")
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({ mode = "contact" }: { mode?: "contact" | "admission" }) {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: mode === "admission" ? "I would like to know more about admissions." : "" }
  });

  return (
    <form className="glass rounded-2xl p-6 shadow-glass md:p-8" onSubmit={handleSubmit(() => undefined)}>
      <div className="grid gap-5">
        {[
          ["name", "Parent / Guardian Name", "Your name"],
          ["phone", "Phone", "Mobile number"],
          ["email", "Email", "Email address"]
        ].map(([name, label, placeholder]) => (
          <label className="grid gap-2 text-sm font-semibold text-slate-700" key={name}>
            {label}
            <input className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" placeholder={placeholder} {...register(name as keyof FormValues)} />
            {errors[name as keyof FormValues] ? <span className="text-xs text-red-600">{errors[name as keyof FormValues]?.message}</span> : null}
          </label>
        ))}
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Message
          <textarea className="focus-ring min-h-32 rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" placeholder="How can the school office help?" {...register("message")} />
          {errors.message ? <span className="text-xs text-red-600">{errors.message.message}</span> : null}
        </label>
        <Button type="submit" className="w-full">
          <Send className="h-4 w-4" /> {mode === "admission" ? "Submit Enquiry" : "Send Message"}
        </Button>
        {isSubmitSuccessful ? <p className="text-sm text-primary">Thanks. This static build has validated the form successfully.</p> : null}
      </div>
    </form>
  );
}
