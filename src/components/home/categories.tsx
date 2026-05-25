"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sun, Battery, Zap, Waves, Gauge, ArrowRight } from "lucide-react";

const categories = [
  {
    icon: <Sun className="w-8 h-8" />,
    name: "Solar Panels",
    description: "High-efficiency monocrystalline & polycrystalline panels from 50W to 600W",
    href: "/products?category=solar-panels",
    count: "200+ Products",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-600",
  },
  {
    icon: <Battery className="w-8 h-8" />,
    name: "Lithium Batteries",
    description: "Long-life lithium & lead-acid batteries for reliable power backup solutions",
    href: "/products?category=batteries",
    count: "80+ Products",
    gradient: "from-emerald-400 to-green-500",
    bgGradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    name: "Solar Inverters",
    description: "Smart grid-tie, hybrid & off-grid inverters for every application",
    href: "/products?category=inverters",
    count: "60+ Products",
    gradient: "from-blue-400 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
  },
  {
    icon: <Gauge className="w-8 h-8" />,
    name: "Charge Controllers",
    description: "MPPT & PWM charge controllers for optimal solar energy management",
    href: "/products?category=charge-controllers",
    count: "40+ Products",
    gradient: "from-purple-400 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
  },
  {
    icon: <Waves className="w-8 h-8" />,
    name: "Solar Water Pumps",
    description: "Energy-efficient solar water pumping solutions for agriculture & homes",
    href: "/products?category=water-pumps",
    count: "25+ Products",
    gradient: "from-sky-400 to-cyan-500",
    bgGradient: "from-sky-50 to-cyan-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-600",
  },
  {
    icon: <Sun className="w-8 h-8" />,
    name: "Complete Systems",
    description: "Turnkey solar systems for homes, shops, offices & factories",
    href: "/products?category=complete-systems",
    count: "30+ Packages",
    gradient: "from-rose-400 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-600",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Our Portfolio</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Complete Solar Solutions</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Everything you need for clean, reliable, and cost-effective solar energy — from panels to complete turnkey systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={cat.href} className="block group">
                <div className={`h-full bg-gradient-to-br ${cat.bgGradient} border ${cat.borderColor} rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                  <div className={`inline-flex p-3 bg-gradient-to-br ${cat.gradient} rounded-2xl text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${cat.textColor} bg-white/60 px-3 py-1 rounded-full`}>
                      {cat.count}
                    </span>
                    <span className={`flex items-center gap-1 text-sm font-semibold ${cat.textColor} group-hover:gap-2 transition-all`}>
                      Browse <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
