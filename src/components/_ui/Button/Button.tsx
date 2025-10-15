"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[4px] text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-B&W-Black text-B&W-White hover:bg-gray-900",
        secondary:
          "bg-gray-100 text-black hover:bg-gray-200 focus-visible:ring-gray-300",
        outline:
          "border border-black text-black hover:bg-black hover:text-white focus-visible:ring-gray-900",
        ghost: "text-black hover:bg-gray-100 focus-visible:ring-gray-200",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-12 px-6 w-full md:w-[388px] text-base whitespace-nowrap",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
