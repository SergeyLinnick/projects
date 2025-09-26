"use client"

import { useEffect, useState, useRef } from "react"

interface UseIntersectionVisibilityOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionVisibility(options: UseIntersectionVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const { threshold = 0, rootMargin = "0px", triggerOnce = false } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting

        if (triggerOnce) {
          if (isIntersecting && !hasTriggered) {
            setIsVisible(true)
            setHasTriggered(true)
          }
        } else {
          setIsVisible(isIntersecting)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { isVisible, elementRef }
}
