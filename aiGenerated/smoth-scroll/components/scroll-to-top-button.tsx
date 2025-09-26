"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollToTopButtonProps {
  showAfter?: number
  className?: string
}

export function ScrollToTopButton({ showAfter = 300, className }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY
      const shouldShow = scrolled > showAfter

      if (shouldShow !== isVisible) {
        setIsAnimating(true)
        setTimeout(() => {
          setIsVisible(shouldShow)
          setIsAnimating(false)
        }, 50)
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })

    // Check initial scroll position
    toggleVisibility()

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [showAfter, isVisible])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible && !isAnimating) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-50 transition-all duration-300 ease-out",
        isVisible && !isAnimating ? "animate-fade-in-up" : "animate-fade-out-down",
        className,
      )}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg backdrop-blur-sm",
          "bg-primary/90 hover:bg-primary",
          "border border-border/50",
          "transition-all duration-300 ease-out",
          "hover:scale-110 hover:shadow-xl hover:shadow-primary/25",
          "active:scale-95",
          "group",
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className={cn("h-5 w-5 transition-transform duration-300", "group-hover:-translate-y-0.5")} />
      </Button>
    </div>
  )
}
