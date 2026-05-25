"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CreditCard, Truck, FileText, Check, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter valid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
  address: z.string().min(10, "Enter complete address"),
  city: z.string().min(2, "Enter city"),
  state: z.string().min(2, "Enter state"),
  pincode: z.string().regex(/^\d{6}$/, "Enter valid 6-digit pincode"),
  gstin: z.string().optional(),
  paymentMethod: z.enum(["RAZORPAY", "COD", "BANK_TRANSFER"]),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof schema>;

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Odisha", "Punjab",
  "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, getSubtotal, getGstAmount, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CheckoutFormData>({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: "RAZORPAY" },
  });

  const paymentMethod = watch("paymentMethod");

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-6">Add products to your cart before checking out.</p>
        <Link href="/products">
          <Button variant="solar" size="lg">Browse Products</Button>
        </Link>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 max-w-md mx-auto"
      >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Placed!</h2>
        <p className="text-slate-500 mb-2">Order #{orderSuccess}</p>
        <p className="text-slate-500 mb-8">
          Thank you for your order. We&apos;ll confirm it via email and WhatsApp shortly.
          Our team will contact you within 24 hours to confirm delivery details.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button variant="solar" size="lg" className="w-full">Back to Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg" className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const orderData = {
        ...data,
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
          price: i.product.salePrice || i.product.price,
        })),
        subtotal: getSubtotal(),
        gstAmount: getGstAmount(),
        totalAmount: getTotal(),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      const { orderNumber } = await res.json();
      clearCart();
      setOrderSuccess(orderNumber);
    } catch {
      toast({ type: "error", title: "Order failed", description: "Please try again or contact us." });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        {/* Steps indicator */}
        <div className="flex items-center gap-4 mb-8">
          {[
            { n: 1, label: "Shipping", icon: <Truck className="w-4 h-4" /> },
            { n: 2, label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
            { n: 3, label: "Review", icon: <FileText className="w-4 h-4" /> },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step >= s.n ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-400"
              }`}>
                {step > s.n ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <span className={`text-sm font-medium ${step >= s.n ? "text-slate-900" : "text-slate-400"}`}>{s.label}</span>
              {s.n < 3 && <div className="h-px w-8 bg-slate-200" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Shipping */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                  <Input placeholder="Rajesh Sharma" {...register("name")} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number *</label>
                  <Input placeholder="8090277689" {...register("phone")} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                <Input type="email" placeholder="you@example.com" {...register("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Address *</label>
                <Input placeholder="House/Flat No, Street, Area" {...register("address")} />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">City *</label>
                  <Input placeholder="Mumbai" {...register("city")} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">State *</label>
                  <select {...register("state")} className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Pincode *</label>
                  <Input placeholder="208005" {...register("pincode")} maxLength={6} />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">GSTIN (Optional)</label>
                <Input placeholder="22AAAAA0000A1Z5" {...register("gstin")} />
                <p className="text-xs text-slate-400 mt-1">For GST invoice and Input Tax Credit</p>
              </div>
              <Button type="button" variant="solar" size="lg" className="w-full" onClick={() => setStep(2)}>
                Continue to Payment
              </Button>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600">← Back</button>
                <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    value: "RAZORPAY",
                    label: "Online Payment",
                    desc: "UPI, Credit/Debit Card, Net Banking, EMI",
                    icon: <CreditCard className="w-5 h-5 text-blue-500" />,
                    recommended: true,
                  },
                  {
                    value: "COD",
                    label: "Cash on Delivery",
                    desc: "Pay when product is delivered (extra ₹500 handling charge)",
                    icon: <Truck className="w-5 h-5 text-emerald-500" />,
                    recommended: false,
                  },
                  {
                    value: "BANK_TRANSFER",
                    label: "Bank Transfer / NEFT",
                    desc: "Transfer to our bank account (details provided after order)",
                    icon: <FileText className="w-5 h-5 text-purple-500" />,
                    recommended: false,
                  },
                ].map((method) => (
                  <label key={method.value} className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${
                    paymentMethod === method.value ? "border-amber-500 bg-amber-50" : "border-slate-200 hover:border-slate-300"
                  }`}>
                    <input type="radio" value={method.value} {...register("paymentMethod")} className="sr-only" />
                    <div className="mt-0.5">{method.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{method.label}</span>
                        {method.recommended && <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium">Recommended</span>}
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{method.desc}</p>
                    </div>
                    {paymentMethod === method.value && <Check className="w-5 h-5 text-amber-500 shrink-0" />}
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Order Notes (Optional)</label>
                <textarea
                  {...register("notes")}
                  placeholder="Special instructions for delivery, installation requirements, etc."
                  rows={3}
                  className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <Button type="button" variant="solar" size="lg" className="w-full" onClick={() => setStep(3)}>
                Review Order
              </Button>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setStep(2)} className="text-slate-400 hover:text-slate-600">← Back</button>
                <h2 className="text-xl font-bold text-slate-900">Review & Place Order</h2>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                <Shield className="w-4 h-4 inline mr-2" />
                Your payment information is secured with 256-bit SSL encryption.
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                variant="solar"
                size="xl"
                className="w-full"
                loading={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : `Place Order — ${formatPrice(getTotal())}`}
              </Button>

              <p className="text-xs text-slate-400 text-center">
                By placing your order, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </motion.div>
          )}
        </form>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
          <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-slate-600 line-clamp-1 flex-1 mr-2">{item.product.name} × {item.quantity}</span>
                <span className="font-medium text-slate-900 shrink-0">{formatPrice((item.product.salePrice || item.product.price) * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(getSubtotal())}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST</span>
              <span>{formatPrice(getGstAmount())}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery</span>
              <span className="text-emerald-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Secure 256-bit SSL payment
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Truck className="w-3.5 h-3.5 text-blue-500" />
              Free delivery across India
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Check className="w-3.5 h-3.5 text-amber-500" />
              GST invoice provided
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
