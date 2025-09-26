"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Code2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const scrollToDemo = () => {
    const demoSection = document.getElementById("demo-start")
    demoSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-background via-background to-accent/5">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-border/50 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Scroll to Top Demo</span>
        </div>

        {/* Main heading */}
        <div className="space-y-6">
          <h1
            className={cn("text-5xl md:text-7xl lg:text-8xl font-light tracking-tight", "text-balance leading-tight")}
          >
            Smooth Scrolling
            <br />
            <span className="text-primary">Without Limitation</span>
          </h1>

          <p
            className={cn("text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto", "text-pretty leading-relaxed")}
          >
            Experience elegant scroll-to-top functionality with custom intersection observer hooks and beautiful
            animations.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            onClick={scrollToDemo}
            size="lg"
            className={cn(
              "px-8 py-6 text-lg rounded-full",
              "bg-primary hover:bg-primary/90",
              "transition-all duration-300 hover:scale-105 hover:shadow-lg",
            )}
          >
            <Code2 className="w-5 h-5 mr-2" />
            View Demo
          </Button>

          <Button
            variant="outline"
            size="lg"
            className={cn(
              "px-8 py-6 text-lg rounded-full",
              "border-border/50 backdrop-blur-sm",
              "hover:bg-accent/50 transition-all duration-300",
            )}
          >
            Learn More
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">Scroll to reveal</span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
