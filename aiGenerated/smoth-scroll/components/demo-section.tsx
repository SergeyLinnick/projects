"use client"

import type React from "react"

import { useIntersectionVisibility } from "@/hooks/use-intersection-visibility"
import { cn } from "@/lib/utils"

interface DemoSectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "dark" | "accent"
}

export function DemoSection({ id, title, subtitle, children, className, variant = "default" }: DemoSectionProps) {
  const { isVisible, elementRef } = useIntersectionVisibility({
    threshold: 0.1,
    rootMargin: "-50px",
  })

  const variantStyles = {
    default: "bg-background text-foreground",
    dark: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  }

  return (
    <section
      id={id}
      ref={elementRef}
      className={cn(
        "min-h-screen flex flex-col justify-center items-center px-6 py-20",
        "transition-all duration-700 ease-out",
        variantStyles[variant],
        isVisible ? "opacity-100 translate-y-0" : "opacity-60 translate-y-8",
        className,
      )}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2
            className={cn("text-4xl md:text-6xl lg:text-7xl font-light tracking-tight", "text-balance leading-tight")}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto",
                "text-pretty leading-relaxed",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className="pt-8">{children}</div>
      </div>
    </section>
  )
}
