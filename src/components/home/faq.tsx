"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is the cost of a solar panel system for a home in India?",
    a: "The cost of a residential solar system in India typically ranges from ₹65,000 to ₹1,20,000 per kWp installed capacity. For an average home requiring 3-5 kWp, the total cost ranges from ₹2 – ₹6 lakhs before subsidy. Government subsidies under PM Surya Ghar Yojana can reduce costs by ₹30,000 – ₹78,000.",
  },
  {
    q: "How much electricity can a 5kW solar system generate?",
    a: "A 5kW solar system in India typically generates 18 – 22 units (kWh) of electricity per day under good sunlight conditions. This translates to approximately 550 – 660 units per month, which is sufficient to power an average Indian household with 3-4 rooms.",
  },
  {
    q: "What is the payback period for a solar panel installation?",
    a: "The typical payback period for a residential solar system in India is 3 – 5 years depending on your electricity tariff, system size, and available subsidies. After the payback period, you enjoy virtually free electricity for the remaining 20+ years of the system's life.",
  },
  {
    q: "Which brands of solar panels do you supply?",
    a: "We are authorized dealers for India's top solar brands including Adani Solar, Tata Power Solar, Waaree, Luminous, Loom Solar, Exide, and Livguard. All products are genuine, BIS certified, and come with full manufacturer warranty.",
  },
  {
    q: "Do you provide installation services?",
    a: "Yes! We provide complete turnkey installation services including site survey, system design, equipment supply, civil work, electrical work, grid connectivity, net metering application, and post-installation support. Our certified installation teams operate across major cities in India.",
  },
  {
    q: "What government subsidies are available for solar in India?",
    a: "Under PM Surya Ghar Muft Bijli Yojana, residential customers can get subsidies of ₹30,000 for 1-2 kW systems, ₹60,000 for 2-3 kW systems, and ₹78,000 for above 3 kW systems. Commercial and industrial installations may be eligible for accelerated depreciation and other state-level incentives.",
  },
  {
    q: "What warranty do your products come with?",
    a: "Solar panels come with 25-year linear power output warranty and 10-year product warranty from manufacturers. Lithium batteries have 5-7 year warranties, while inverters carry 2-5 year warranties. We also provide 1 year installation warranty on our workmanship.",
  },
  {
    q: "Can I buy solar products online and get them delivered?",
    a: "Yes! You can browse and order all our products online with delivery across India. We offer secure payment options including Razorpay, UPI, bank transfer, and EMI. For large orders and installation projects, we recommend requesting a free consultation first.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">FAQs</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500">Everything you need to know about solar energy and our services.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className={cn("font-semibold text-sm leading-snug pr-4", open === i ? "text-amber-600" : "text-slate-900")}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn("w-5 h-5 shrink-0 text-slate-400 transition-transform", open === i && "rotate-180 text-amber-500")}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
