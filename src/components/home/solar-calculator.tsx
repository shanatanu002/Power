"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Zap, IndianRupee, Sun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [result, setResult] = useState<{
    systemSize: number;
    estimatedSavings: number;
    paybackPeriod: number;
    co2Saved: number;
    systemCost: number;
  } | null>(null);

  const calculate = () => {
    const bill = parseFloat(monthlyBill);
    if (!bill || bill <= 0) return;

    // Calculations based on average Indian solar economics
    const unitRate = 8; // ₹8 per kWh average
    const monthlyUnits = bill / unitRate;
    const systemSize = Math.ceil(monthlyUnits / 120 * 10) / 10; // kWp
    const systemCost = systemSize * 65000; // ~₹65,000 per kWp
    const annualSavings = bill * 12 * 0.85; // 85% savings
    const paybackPeriod = systemCost / annualSavings;
    const co2Saved = systemSize * 1.4 * 10; // tonnes over 10 years

    setResult({
      systemSize: Math.max(1, systemSize),
      estimatedSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Saved: Math.round(co2Saved * 10) / 10,
      systemCost: Math.round(systemCost),
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-600 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Solar Savings Calculator
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How Much Can You Save
              <span className="text-amber-500"> With Solar?</span>
            </h2>
            <p className="text-slate-500 mb-8">
              Enter your monthly electricity bill and discover your potential savings,
              system size, and payback period instantly.
            </p>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Monthly Electricity Bill (₹)
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="number"
                    placeholder="e.g. 3000"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="pl-9"
                    min="0"
                  />
                </div>
                <Button onClick={calculate} variant="solar" className="px-6">
                  Calculate
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Based on average electricity tariff of ₹8/unit
              </p>
            </div>
          </motion.div>

          {/* Right - Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Sun className="w-5 h-5 text-amber-500" />,
                      label: "System Size",
                      value: `${result.systemSize} kWp`,
                      bg: "bg-amber-50 border-amber-200",
                    },
                    {
                      icon: <IndianRupee className="w-5 h-5 text-emerald-500" />,
                      label: "Annual Savings",
                      value: `₹${result.estimatedSavings.toLocaleString("en-IN")}`,
                      bg: "bg-emerald-50 border-emerald-200",
                    },
                    {
                      icon: <Zap className="w-5 h-5 text-blue-500" />,
                      label: "Payback Period",
                      value: `${result.paybackPeriod} Years`,
                      bg: "bg-blue-50 border-blue-200",
                    },
                    {
                      icon: <Sun className="w-5 h-5 text-green-500" />,
                      label: "CO₂ Saved (10yr)",
                      value: `${result.co2Saved} Tonnes`,
                      bg: "bg-green-50 border-green-200",
                    },
                  ].map((item) => (
                    <div key={item.label} className={`${item.bg} border rounded-2xl p-4`}>
                      <div className="flex items-center gap-2 mb-1">
                        {item.icon}
                        <span className="text-xs font-medium text-slate-500">{item.label}</span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                  <p className="text-sm text-slate-400 mb-2">Estimated System Cost</p>
                  <p className="text-3xl font-bold text-amber-400">
                    ₹{result.systemCost.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">Subsidy available under PM Surya Ghar Yojana</p>
                  <Link href="/contact">
                    <Button variant="solar" className="w-full group">
                      Get Exact Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Your Savings Await!</h3>
                <p className="text-slate-500 text-sm mb-6">
                  Enter your monthly electricity bill to see your personalized solar savings estimate.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Avg Savings", value: "90%" },
                    { label: "Payback", value: "3-5 Yrs" },
                    { label: "Panel Life", value: "25 Yrs" },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                      <p className="text-lg font-bold text-amber-500">{item.value}</p>
                      <p className="text-xs text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
