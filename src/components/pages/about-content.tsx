"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sun, Award, Users, Zap, Shield, ArrowRight, CheckCircle, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const milestones = [
  { year: "2009", title: "Founded", desc: "Started as a small solar distribution company" },
  { year: "2013", title: "Expansion", desc: "Expanded to 3 states, signed Adani Solar dealership" },
  { year: "2017", title: "Industrial Projects", desc: "First 500kW industrial installation completed" },
  { year: "2020", title: "E-commerce Launch", desc: "Launched online store serving pan-India customers" },
  { year: "2023", title: "50MW Milestone", desc: "Crossed 50MW of total installed solar capacity" },
  { year: "2024", title: "Today", desc: "5000+ customers, 7 states, 10+ brand partnerships" },
];

const team = [
  { name: "Rajendra Patel", role: "Founder & CEO", desc: "15+ years in renewable energy", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Sunita Sharma", role: "Head of Operations", desc: "Expert in solar project management", img: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=200&h=200&fit=crop&crop=face" },
  { name: "Amit Verma", role: "Technical Director", desc: "Certified solar engineer, MNRE approved", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { name: "Priya Joshi", role: "Sales Head", desc: "B2B solar solutions specialist", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
];

export function AboutContent() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h1 className="text-5xl font-bold mt-3 mb-5">
              Powering India with
              <span className="text-amber-400"> Clean Energy</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
              For over 15 years, Yati Powers has been dedicated to making solar energy accessible,
              affordable, and reliable for every Indian home and business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-500 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "5,000+", label: "Happy Customers" },
            { value: "50 MW+", label: "Installed Capacity" },
            { value: "15 Years", label: "Experience" },
            { value: "10+ Brands", label: "Partnerships" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-slate-800 font-medium mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8"
            >
              <Target className="w-10 h-10 text-amber-500 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To accelerate India&apos;s transition to clean, renewable solar energy by making
                premium solar products accessible to every home, business, and institution —
                regardless of scale or location.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-8"
            >
              <Eye className="w-10 h-10 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be India&apos;s most trusted solar energy partner — known for genuine products,
                expert knowledge, and exceptional after-sales service that creates customers for life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">15 Years of Solar Excellence</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow inline-block w-full md:max-w-xs">
                      <span className="text-amber-500 font-bold text-lg">{m.year}</span>
                      <h3 className="font-bold text-slate-900 mt-1">{m.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12 shrink-0">
                    <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-md z-10" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Leadership</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden bg-slate-100 group-hover:shadow-xl transition-shadow">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-amber-500 text-sm font-medium">{member.role}</p>
                <p className="text-slate-400 text-xs mt-1">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-4xl font-bold mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Integrity", desc: "We sell only genuine, certified products with honest pricing. No shortcuts." },
              { icon: <Award className="w-6 h-6" />, title: "Excellence", desc: "From product selection to installation — we pursue perfection in everything." },
              { icon: <Users className="w-6 h-6" />, title: "Customer First", desc: "Our customers' long-term success is always our primary measure of success." },
              { icon: <Sun className="w-6 h-6" />, title: "Sustainability", desc: "Every solar installation we complete brings India closer to a clean energy future." },
            ].map((v) => (
              <div key={v.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-amber-400 mb-3">{v.icon}</div>
                <h3 className="font-bold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Join the Solar Revolution</h2>
          <p className="text-slate-800 mb-8">
            Be part of thousands of Indian families and businesses that have already made the switch to clean, affordable solar energy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="xl" className="bg-slate-900 text-white hover:bg-slate-800">
                Get Free Consultation <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="xl" variant="outline-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
