"use client"

import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Zap, Eye, Layers } from "lucide-react"

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />

      <DemoSection
        id="demo-start"
        title="Custom Hook Power"
        subtitle="Built with a custom useIntersectionVisibility hook that leverages the Intersection Observer API for optimal performance and smooth animations."
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Intersection Observer</h3>
              <p className="text-muted-foreground text-pretty">
                Efficiently tracks element visibility with configurable thresholds and root margins.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Performance First</h3>
              <p className="text-muted-foreground text-pretty">
                Passive scroll listeners and optimized animations ensure smooth 60fps performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </DemoSection>

      <DemoSection
        id="features"
        title="Elegant Design"
        subtitle="Every detail crafted for the perfect user experience with modern design principles and accessibility in mind."
        variant="dark"
      >
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto">
              <Code2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">TypeScript Ready</h3>
            <p className="text-primary-foreground/70 text-pretty">
              Fully typed with comprehensive interfaces and excellent developer experience.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto">
              <Layers className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Customizable</h3>
            <p className="text-primary-foreground/70 text-pretty">
              Flexible options for threshold, styling, and animation behavior.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Accessible</h3>
            <p className="text-primary-foreground/70 text-pretty">
              ARIA labels, keyboard navigation, and screen reader friendly.
            </p>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        id="implementation"
        title="Simple Implementation"
        subtitle="Add beautiful scroll-to-top functionality to any project with just a few lines of code."
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-3xl mx-auto">
          <CardContent className="p-8">
            <pre className="text-left text-sm bg-muted/50 rounded-lg p-6 overflow-x-auto">
              <code className="text-foreground">
                {`import { ScrollToTopButton } from '@/components/scroll-to-top-button'

export default function App() {
  return (
    <div>
      {/* Your content */}
      <ScrollToTopButton showAfter={300} />
    </div>
  )
}`}
              </code>
            </pre>
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        id="demo-end"
        title="Keep Scrolling"
        subtitle="The scroll-to-top button will appear after you've scrolled past the hero section. Try it out!"
        variant="accent"
      >
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-lg text-accent-foreground/80 mb-6">
              {"Scroll down to see the button appear, then click it to return to the top smoothly."}
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              variant="outline"
              size="lg"
              className="border-accent-foreground/20 hover:bg-accent-foreground/10"
            >
              Or Click Here to Scroll to Top
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-12">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="h-24 bg-accent-foreground/5 rounded-lg border border-accent-foreground/10" />
            ))}
          </div>
        </div>
      </DemoSection>

      <ScrollToTopButton showAfter={300} />
    </main>
  )
}
