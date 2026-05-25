"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home, Building2, Factory, School, Battery, Wrench,
  CheckCircle, ArrowRight, Sun, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <Home className="w-8 h-8" />,
    title: "Residential Solar Installation",
    slug: "residential",
    description: "Complete rooftop solar systems for homes. From 1kW for a small apartment to 10kW+ for large bungalows. Includes panels, inverter, battery backup, and net metering.",
    features: ["Free site survey", "Customized design", "Subsidy assistance", "Grid connection", "10-year AMC available"],
    capacity: "1kW – 10kW",
    timeline: "3–7 days installation",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Commercial Solar",
    slug: "commercial",
    description: "Solar solutions for offices, malls, hospitals, hotels, and commercial establishments. Reduce electricity costs by up to 80% with commercial solar + storage.",
    features: ["Energy audit", "ROI analysis", "Bulk pricing", "Priority installation", "GST invoice"],
    capacity: "10kW – 500kW",
    timeline: "1–4 weeks",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: <Factory className="w-8 h-8" />,
    title: "Industrial Solar EPC",
    slug: "industrial",
    description: "Large-scale solar EPC (Engineering, Procurement, Construction) for factories and manufacturing units. Complete project execution with SCADA monitoring.",
    features: ["Full EPC service", "SCADA monitoring", "Grid-tie / off-grid", "Accelerated depreciation", "O&M contracts"],
    capacity: "100kW – 5MW+",
    timeline: "1–6 months",
    color: "from-emerald-400 to-green-500",
  },
  {
    icon: <School className="w-8 h-8" />,
    title: "Institutional Solar",
    slug: "institutional",
    description: "Solar for schools, colleges, hospitals, and government buildings. Maximum government subsidy assistance and specialized project management.",
    features: ["Maximum subsidy", "MNRE approval", "Green certification", "Community impact", "Training sessions"],
    capacity: "5kW – 1MW",
    timeline: "2–8 weeks",
    color: "from-purple-400 to-violet-500",
  },
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Battery Backup Systems",
    slug: "battery-backup",
    description: "Standalone and solar-integrated battery backup solutions for uninterrupted power supply. Lithium LiFePO4 and lead-acid options for all budgets.",
    features: ["Lithium & lead-acid", "UPS integration", "Smart BMS", "Remote monitoring", "5-year warranty"],
    capacity: "1 kWh – 500 kWh",
    timeline: "1–3 days",
    color: "from-cyan-400 to-sky-500",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Solar AMC & Maintenance",
    slug: "maintenance",
    description: "Annual Maintenance Contracts for all solar installations. Panel cleaning, inverter health check, performance audit, and 24/7 fault resolution.",
    features: ["Bi-annual cleaning", "Performance audit", "24/7 support", "Remote monitoring", "Emergency response"],
    capacity: "All system sizes",
    timeline: "Ongoing",
    color: "from-rose-400 to-pink-500",
  },
];

const process = [
  { step: "01", title: "Free Consultation", desc: "Call us or fill the form. Our solar advisor contacts you within 24 hours." },
  { step: "02", title: "Site Survey", desc: "Our engineer visits your site to assess rooftop area, shading, and electrical setup." },
  { step: "03", title: "Custom Design", desc: "We design an optimized solar system based on your energy needs and budget." },
  { step: "04", title: "Quotation", desc: "Detailed quotation with equipment specs, financial projections, and ROI calculation." },
  { step: "05", title: "Installation", desc: "Our certified team installs the system within the promised timeline." },
  { step: "06", title: "Commissioning", desc: "System testing, net metering application, and full handover with training." },
];

export function ServicesContent() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">What We Do</span>
            <h1 className="text-5xl font-bold mt-3 mb-5">End-to-End Solar Services</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              From free site survey to commissioning and lifetime support — Yati Powers handles every aspect of your solar journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-5`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{service.description}</p>

                <ul className="space-y-1.5 mb-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2.5 py-1 rounded-full">{service.capacity}</span>
                  </div>
                  <Link href="/contact" className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors">
                    Get Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Our 6-Step Solar Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <span className="text-3xl font-black text-amber-200 shrink-0 leading-none">{step.step}</span>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Sun className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Start Your Solar Journey Today</h2>
          <p className="text-slate-300 mb-8">Free site survey. No obligation. Expert advice.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="xl" variant="solar">Get Free Quote <ArrowRight className="w-5 h-5" /></Button>
            </Link>
            <a href="tel:+919876543210">
              <Button size="xl" variant="outline-white"><Phone className="w-5 h-5" /> Call Now</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
