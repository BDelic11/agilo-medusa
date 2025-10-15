"use "
import { RefObject, useEffect, useState } from "react"

export const useIntersection = (
  element: RefObject<HTMLElement | null>,
  rootMargin = "0px",
  threshold = 0.2
) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = element.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin, threshold }
    )

    observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [element, rootMargin, threshold])

  return isVisible
}
