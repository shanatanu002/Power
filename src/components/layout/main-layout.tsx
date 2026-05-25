import { Header } from "./header";
import { Footer } from "./footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
