"use client";

import { motion } from "framer-motion";

const brands = [
  { name: "Adani Solar", tagline: "India's Largest Solar Manufacturer" },
  { name: "Tata Power Solar", tagline: "Trusted Since 1989" },
  { name: "Luminous", tagline: "Power Solutions Expert" },
  { name: "Exide", tagline: "Battery Market Leader" },
  { name: "Livguard", tagline: "Advanced Energy Storage" },
  { name: "Waaree", tagline: "Solar Pioneer" },
  { name: "Loom Solar", tagline: "Mono PERC Technology" },
  { name: "Amaze", tagline: "Power Backup Solutions" },
];

export function BrandsSection() {
  return (
    <section className="py-16 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Our Partners</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-3">
            Authorized Dealer for Top Brands
          </h2>
          <p className="text-slate-400">
            We partner only with the best — ensuring you get genuine, high-quality products.
          </p>
        </motion.div>
      </div>

      {/* Scrolling brands row */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -50 * brands.length] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 shrink-0"
          >
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="shrink-0 w-48 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-amber-500/30 transition-colors cursor-default"
              >
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-amber-400 text-lg font-bold">{brand.name[0]}</span>
                </div>
                <p className="text-white font-semibold text-sm">{brand.name}</p>
                <p className="text-slate-400 text-xs mt-1">{brand.tagline}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 text-center">
        <p className="text-slate-500 text-sm">
          All products come with manufacturer warranty and are BIS certified.
          <span className="text-amber-400 ml-2">Contact us for bulk pricing.</span>
        </p>
      </div>
    </section>
  );
}
