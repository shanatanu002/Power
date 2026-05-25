import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yati Powers - Premium Solar Panels & Battery Solutions in India",
    template: "%s | Yati Powers",
  },
  description:
    "India's trusted solar energy solutions provider. Supply and installation of solar panels, lithium batteries, inverters from top brands like Adani, Tata Power Solar, Luminous, Waaree, and more for residential, commercial & industrial use.",
  keywords: [
    "solar panel dealer India",
    "solar battery supplier",
    "commercial solar solutions",
    "residential solar panels",
    "solar installation",
    "inverter battery supplier",
    "Adani solar panels",
    "Tata Power Solar",
    "Luminous inverter",
    "Waaree solar",
    "lithium battery backup",
    "solar energy India",
    "off-grid solar system",
    "on-grid solar system",
    "solar EPC contractor",
  ],
  authors: [{ name: "Yati Powers" }],
  creator: "Yati Powers",
  publisher: "Yati Powers",
  formatDetection: { telephone: true, email: true, address: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Yati Powers",
    title: "Yati Powers - Premium Solar Panels & Battery Solutions",
    description: "India's trusted solar energy solutions provider for homes, businesses & industries.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Yati Powers Solar Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yati Powers - Solar Energy Solutions",
    description: "Premium solar panels, batteries & inverters for all your energy needs.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Yati Powers",
              url: process.env.NEXT_PUBLIC_APP_URL,
              logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
              description: "Solar panels, batteries and energy solutions for residential and commercial use.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE,
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: [
                "https://www.facebook.com/yatipowers",
                "https://www.instagram.com/yatipowers",
                "https://www.linkedin.com/company/yatipowers",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-white text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
