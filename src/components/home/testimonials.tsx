"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner, Delhi",
    rating: 5,
    content: "Installed a 5kW Adani solar system through Yati Powers. My electricity bill dropped from ₹4,500 to under ₹200. The team was professional and the installation was clean. Highly recommended!",
    savings: "₹52,000/year saved",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Priya Patel",
    role: "Shop Owner, Mumbai",
    rating: 5,
    content: "Got a commercial solar setup for my garment store. Yati Powers handled everything from site survey to grid connection. ROI has been incredible. Best investment for any business owner.",
    savings: "₹1.2L/year saved",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Amit Kumar",
    role: "Factory Owner, Pune",
    rating: 5,
    content: "50kW industrial solar system. Yati Powers gave us the best price for Waaree panels and their installation team completed the job ahead of schedule. Professional outfit all the way.",
    savings: "₹8L+/year saved",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Sunita Reddy",
    role: "School Principal, Hyderabad",
    rating: 5,
    content: "Installed 15kW solar for our school. Kids love the environment lesson it teaches. Yati Powers gave us subsidy guidance which saved us significantly. Great team, great products.",
    savings: "₹2.5L/year saved",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Vikram Singh",
    role: "Hotel Owner, Jaipur",
    rating: 5,
    content: "20kW system for our hotel with Luminous battery backup. No more power cuts affecting guests. Yati Powers team was knowledgeable and helped us choose the perfect configuration.",
    savings: "₹3.8L/year saved",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Meera Joshi",
    role: "Homeowner, Bangalore",
    rating: 5,
    content: "Skeptical initially but Yati Powers data convinced me. 3kW Tata Power Solar system — electricity bill is almost zero now. Product quality and after-sales service are exceptional.",
    savings: "₹38,000/year saved",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Customer Stories</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
            5000+ Happy Solar Families
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Join thousands of satisfied customers who have switched to clean, affordable solar energy with Yati Powers.
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-slate-600 font-semibold ml-2">4.9/5</span>
            <span className="text-slate-400 text-sm">(1,200+ reviews)</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <Quote className="w-8 h-8 text-amber-400/40 mb-4" />

              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">{t.content}</p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-700 mb-4 inline-block">
                💰 {t.savings}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
