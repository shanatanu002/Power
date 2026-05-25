"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Building2, Factory, School, Hotel, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: <Home className="w-7 h-7" />,
    title: "Residential Solar",
    description: "Power your home with clean solar energy. Save up to 90% on electricity bills with our residential solar packages designed for Indian homes.",
    href: "/services/residential",
    systems: "1kW – 10kW",
    savings: "₹3,000 – ₹8,000/month",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    title: "Commercial Solar",
    description: "Reduce operational costs and demonstrate sustainability. Commercial solar for offices, malls, hospitals, and business establishments.",
    href: "/services/commercial",
    systems: "10kW – 100kW",
    savings: "₹30,000 – ₹3L/month",
    color: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50",
  },
  {
    icon: <Factory className="w-7 h-7" />,
    title: "Industrial Solar",
    description: "Large-scale solar solutions for factories and manufacturing plants. Eliminate grid dependency with high-capacity solar systems.",
    href: "/services/industrial",
    systems: "100kW – 5MW+",
    savings: "₹5L – ₹50L+/month",
    color: "from-emerald-400 to-green-500",
    bg: "bg-emerald-50",
  },
  {
    icon: <School className="w-7 h-7" />,
    title: "Institutional Solar",
    description: "Solar solutions for schools, colleges, hospitals, and government institutions. Eligible for maximum government subsidies.",
    href: "/services/institutional",
    systems: "5kW – 500kW",
    savings: "Up to 95% subsidy available",
    color: "from-purple-400 to-violet-500",
    bg: "bg-purple-50",
  },
];

export function SolutionsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Solutions</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Solar for Every Segment</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Whether you&apos;re a homeowner, business, or large industrial facility — we have the perfect solar solution for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={sol.href} className="block group">
                <div className="bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex items-start gap-5">
                    <div className={`bg-gradient-to-br ${sol.color} p-3.5 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                      {sol.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{sol.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{sol.description}</p>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className={`${sol.bg} px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600`}>
                          System: {sol.systems}
                        </div>
                        <div className="bg-emerald-50 px-3 py-1.5 rounded-xl text-xs font-medium text-emerald-700">
                          {sol.savings}
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold text-slate-600 group-hover:gap-2 transition-all`}>
                        Learn More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
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
