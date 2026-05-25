import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-amber-500 text-slate-900 shadow hover:bg-amber-400 active:bg-amber-600",
        destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline: "border-2 border-amber-500 bg-transparent text-amber-500 shadow-sm hover:bg-amber-500 hover:text-slate-900",
        secondary: "bg-slate-800 text-white shadow-sm hover:bg-slate-700",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-amber-500 underline-offset-4 hover:underline",
        solar: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:from-amber-400 hover:to-orange-400 active:scale-95",
        white: "bg-white text-slate-900 shadow hover:bg-slate-50",
        "outline-white": "border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-900",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "solar" | "white" | "outline-white";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
