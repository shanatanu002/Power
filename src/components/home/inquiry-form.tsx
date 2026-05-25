"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  subject: z.string().optional(),
  message: z.string().min(10, "Please describe your requirement in at least 10 characters"),
  type: z.enum(["GENERAL", "PRODUCT", "QUOTE", "INSTALLATION", "CONSULTATION"]),
});

type FormData = z.infer<typeof schema>;

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "CONSULTATION" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      reset();
      toast({ type: "success", title: "Inquiry Sent!", description: "We'll get back to you within 24 hours." });
    } catch {
      toast({ type: "error", title: "Failed to send", description: "Please try again or call us directly." });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
                Free Solar
                <span className="text-amber-500"> Consultation</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Fill out the form and our solar experts will contact you within 24 hours
                with a customized solution and free site assessment.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Phone className="w-5 h-5" />, label: "Call Us", value: "+91 98765 43210", href: "tel:+918090277689" },
                  { icon: <Mail className="w-5 h-5" />, label: "Email Us", value: "info@yatipowers.com", href: "mailto:info@yatipowers.com" },
                  { icon: <MapPin className="w-5 h-5" />, label: "Visit Us", value: "123 Solar Street, Energy Nagar, India", href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{item.label}</p>
                      <p className="text-slate-700 font-medium text-sm mt-0.5">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
                <p className="font-semibold text-slate-900 mb-1">Business Hours</p>
                <p className="text-sm text-slate-500">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                <p className="text-sm text-slate-500">Sunday: 10:00 AM – 4:00 PM</p>
                <p className="text-xs text-amber-600 mt-2 font-medium">
                  🌟 Emergency support available 24/7
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl border border-slate-200 p-8"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                  <p className="text-slate-500 mb-6">
                    Your inquiry has been received. Our solar expert will contact you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                      <Input placeholder="Rajesh Sharma" {...register("name")} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number *</label>
                      <Input placeholder="98765 43210" {...register("phone")} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                    <Input type="email" placeholder="you@example.com" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Inquiry Type</label>
                    <select
                      {...register("type")}
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="CONSULTATION">Free Consultation</option>
                      <option value="QUOTE">Get Price Quote</option>
                      <option value="PRODUCT">Product Inquiry</option>
                      <option value="INSTALLATION">Installation Service</option>
                      <option value="GENERAL">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Requirement *</label>
                    <Textarea
                      placeholder="Tell us about your energy needs — monthly bill, location, type of property, etc."
                      rows={4}
                      {...register("message")}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" variant="solar" size="lg" loading={isSubmitting} className="w-full group">
                    <Send className="w-4 h-4" />
                    Send Inquiry
                  </Button>

                  <p className="text-xs text-slate-400 text-center">
                    By submitting, you agree to our Privacy Policy. We never spam.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
