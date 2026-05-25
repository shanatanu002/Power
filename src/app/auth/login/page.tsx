import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Login | Yati Powers" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <Suspense fallback={<div className="w-full max-w-md h-96 bg-slate-900 rounded-3xl animate-pulse" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
