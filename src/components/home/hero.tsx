"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sun, Zap, Shield, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "5000+", label: "Installations", icon: <Sun className="w-5 h-5" /> },
  { value: "50MW+", label: "Solar Capacity", icon: <Zap className="w-5 h-5" /> },
  { value: "15+", label: "Years Experience", icon: <Award className="w-5 h-5" /> },
  { value: "100%", label: "Certified Products", icon: <Shield className="w-5 h-5" /> },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-solar-hero">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        {/* Solar panel grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Floating orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-white">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6"
          >
            <Sun className="w-4 h-4 animate-spin" style={{ animationDuration: "8s" }} />
            India&apos;s Trusted Solar Partner
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            Power Your Future
            <br />
            <span className="text-solar-gradient">With Solar</span>
            <br />
            <span className="text-slate-300">Energy</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg"
          >
            Premium solar panels, lithium batteries, and inverters from India&apos;s top brands.
            Trusted solutions for homes, businesses, and industries across India.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link href="/products">
              <Button size="xl" variant="solar" className="group">
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="xl" variant="outline-white">
                Free Consultation
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-6"
          >
            {["BIS Certified", "MNRE Listed", "ISO 9001", "10 Year Warranty"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-slate-400">
                <Shield className="w-4 h-4 text-emerald-400" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Stats & Visual */}
        <div className="relative">
          {/* Main visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Solar energy visualization */}
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Central sun */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-4 border-dashed border-amber-500/30 absolute inset-0 scale-150"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/30"
                  >
                    <Sun className="w-16 h-16 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={5 + i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="glass rounded-2xl p-5 text-white border border-white/10 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-amber-400 mb-2">
                      {stat.icon}
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{stat.label}</span>
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-4 -left-4 glass rounded-xl p-3 border border-white/10 text-white text-xs hidden lg:flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Up to 90% savings on electricity</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -right-4 glass rounded-xl p-3 border border-white/10 text-white text-xs hidden lg:flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>25-year panel warranty</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
