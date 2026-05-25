import Link from "next/link";
import { Sun, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const productLinks = [
  { label: "Solar Panels", href: "/products?category=solar-panels" },
  { label: "Lithium Batteries", href: "/products?category=batteries" },
  { label: "Inverters", href: "/products?category=inverters" },
  { label: "Solar Charge Controllers", href: "/products?category=charge-controllers" },
  { label: "Solar Water Pumps", href: "/products?category=water-pumps" },
  { label: "All Products", href: "/products" },
];

const solutionLinks = [
  { label: "Residential Solar", href: "/services/residential" },
  { label: "Commercial Solar", href: "/services/commercial" },
  { label: "Industrial Solar", href: "/services/industrial" },
  { label: "Solar Installation", href: "/services/installation" },
  { label: "Battery Backup", href: "/services/battery-backup" },
  { label: "Solar Maintenance", href: "/services/maintenance" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const brands = ["Adani Solar", "Tata Power Solar", "Luminous", "Exide", "Livguard", "Waaree", "Loom Solar"];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Ready to Switch to Solar?</h3>
            <p className="text-slate-800 mt-1">Get a free consultation and customized solar solution quote today.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Get Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE || "+918090277689"}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 border-2 border-slate-900/20 text-slate-900 rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-white leading-none block">
                  Yati <span className="text-amber-400">Powers</span>
                </span>
                <span className="text-xs text-slate-400">Solar Energy Solutions</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              India&apos;s trusted solar energy solutions provider. We supply premium solar panels,
              batteries, and inverters from top brands for homes, businesses, and industries.
            </p>

            <div className="space-y-3 mb-6">
              <a href="tel:+918090277689" className="flex items-center gap-3 text-sm hover:text-amber-400 transition-colors group">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                +91 98765 43210
              </a>
              <a href="mailto:info@yatipowers.com" className="flex items-center gap-3 text-sm hover:text-amber-400 transition-colors group">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                info@yatipowers.com
              </a>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-slate-400">117/Q/147, Sharda Nagar, Kanpur<br />India – 208005</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: LinkedinIcon, href: "#", label: "LinkedIn" },
                { Icon: YoutubeIcon, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all duration-200 text-slate-400"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 mb-6">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <h5 className="text-white font-medium text-sm mb-3">Certifications</h5>
              <div className="flex flex-wrap gap-2">
                {["ISO 9001", "BIS Approved", "MNRE Listed"].map((cert) => (
                  <span key={cert} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brand Partners */}
        <div className="border-t border-slate-800 mt-12 pt-10">
          <p className="text-xs text-slate-500 text-center mb-5 uppercase tracking-widest">Authorized Dealer & Partner Brands</p>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand) => (
              <span key={brand} className="text-xs font-medium text-slate-400 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 hover:border-amber-500/50 hover:text-slate-300 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Yati Powers. All rights reserved.</p>
          <p>Made with ☀️ for a greener India</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-amber-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
