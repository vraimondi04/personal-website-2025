"use client"

import type React from "react"

import { useEffect, useState, useRef, memo } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface TickerImage {
  id: string
  url: string
}

interface TickerTrackProps {
  children: React.ReactNode
  direction?: "toLeft" | "toRight"
  speed?: number
}

const TickerTrack = memo<TickerTrackProps>(({ children, direction = "toRight", speed = 30 }) => {
  const animationDirection = direction === "toLeft" ? "scroll-left" : "scroll-right"
  const animationDuration = `${speed}s`

  return (
    <div className="relative overflow-hidden w-full h-full">
      <div
        className={`flex gap-4 md:gap-6 lg:gap-9 ${animationDirection}`}
        style={{
          width: "max-content",
          animationDuration,
          willChange: "transform",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
})

TickerTrack.displayName = "TickerTrack"

const TickerImageComponent = memo<{ image: TickerImage }>(({ image }) => (
  <div className="flex-shrink-0 w-[230px] sm:w-[280px] md:w-[330px] h-[28vh] rounded-lg overflow-hidden">
    <Image
      src={image.url || "/placeholder.svg"}
      alt="Ticker image"
      width={330}
      height={224}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg?height=224&width=330"
      }}
      priority={false}
      loading="lazy"
    />
  </div>
))

TickerImageComponent.displayName = "TickerImageComponent"

export function Ticker() {
  const [isVisible, setIsVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)
  const [tickerImages, setTickerImages] = useState<{ [key: string]: TickerImage[] }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const lastScrollTime = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime.current < 16) return // Throttle to ~60fps
      lastScrollTime.current = now

      const mainContainer = document.getElementById("main-container")
      if (mainContainer) {
        const mainContainerRect = mainContainer.getBoundingClientRect()
        const scrollProgress = 1 - mainContainerRect.bottom / window.innerHeight

        if (scrollProgress > 0) {
          setIsVisible(true)
          setOpacity(Math.min(scrollProgress * 2, 1))
        } else {
          setIsVisible(false)
          setOpacity(0)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch("/ticker-images.json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (!data || typeof data !== "object") {
          throw new Error("Invalid JSON structure")
        }

        const processedImages: { [key: string]: TickerImage[] } = Object.entries(data).reduce(
          (acc, [row, urls]) => ({
            ...acc,
            [row]: (urls as string[]).map((url, index) => ({
              id: `${row}-${index}`,
              url,
            })),
          }),
          {} as { [key: string]: TickerImage[] },
        )

        setTickerImages(processedImages)
      } catch (error) {
        console.error("Error loading ticker images:", error)
        setError("Failed to load images. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [])

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>
  }

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 h-screen z-0 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ opacity }}
    >
      <Card className="w-full h-full bg-[#fafafa] p-2 sm:p-4 lg:p-6 overflow-hidden">
        <div className="w-full h-full flex flex-col justify-between gap-4 md:gap-6 lg:gap-9">
          {Object.entries(tickerImages).map(([row, images], rowIndex) => (
            <div key={row} className="relative h-[28vh]">
              <TickerTrack direction={rowIndex % 2 === 0 ? "toRight" : "toLeft"} speed={70}>
                {images.map((image) => (
                  <TickerImageComponent key={image.id} image={image} />
                ))}
              </TickerTrack>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
