"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X, Phone, ExternalLink } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || "918090277689";
const whatsappMessage = encodeURIComponent(
  "Hello! I'm interested in solar solutions from Yati Powers. Could you please provide more information?"
);

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-72 overflow-hidden"
          >
            <div className="bg-[#25D366] p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Yati Powers Support</p>
                <p className="text-green-100 text-xs">Typically replies within minutes</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-600 mb-4">
                👋 Hi there! How can we help you with your solar energy needs today?
              </p>
              <div className="space-y-2">
                {[
                  "I need a solar panel quote",
                  "Battery backup information",
                  "Commercial solar inquiry",
                ].map((msg) => (
                  <a
                    key={msg}
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full text-left px-3 py-2 bg-slate-50 hover:bg-green-50 text-slate-600 hover:text-green-700 rounded-xl text-xs transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    {msg}
                  </a>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl py-2.5 text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Now
                </a>
                <a
                  href="tel:+918090277689"
                  className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-2xl flex items-center justify-center transition-colors group"
        aria-label="WhatsApp Chat"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
            1
          </span>
        )}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </motion.div>

        {/* Pulse animation */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          </>
        )}
      </motion.button>
    </div>
  );
}
