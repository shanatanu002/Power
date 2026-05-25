"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Headphones, Award, Star, Zap, BarChart3, Wrench } from "lucide-react";

const features = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Authorized Dealer",
    description: "Official authorized dealer for Adani, Tata, Luminous, Waaree & 10+ top brands",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Genuine Products",
    description: "100% authentic products with manufacturer warranty and BIS certification",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Expert Installation",
    description: "Professional installation team with 15+ years of combined experience",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your solar queries and issues",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Pan-India Delivery",
    description: "Fast and secure delivery to all major cities and towns across India",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Best Prices",
    description: "Competitive pricing with flexible EMI options and bulk discount offers",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Quick ROI",
    description: "Recover your investment in 3-5 years with consistent energy bill savings",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "5-Star Rated",
    description: "Consistently rated 5 stars by our 5000+ satisfied customers across India",
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Why Yati Powers?</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">
              India&apos;s Most Trusted
              <br />
              <span className="text-amber-500">Solar Energy Partner</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              For over 15 years, Yati Powers has been at the forefront of India&apos;s solar revolution.
              We combine premium products, expert knowledge, and exceptional service to deliver
              solar solutions that truly make a difference — for your energy bills and the planet.
            </p>

            {/* Numbers */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: "5,000+", label: "Happy Customers" },
                { value: "50 MW+", label: "Installed Capacity" },
                { value: "7 States", label: "Pan India Presence" },
                { value: "15 Years", label: "Industry Experience" },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <p className="text-2xl font-bold text-amber-500">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-4 p-4 rounded-2xl border border-slate-200 hover:border-amber-200 hover:shadow-md transition-all group"
              >
                <div className={`${feature.bg} ${feature.color} p-2.5 rounded-xl shrink-0 h-fit group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
