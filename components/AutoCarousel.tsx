// "use client"

// import type React from "react"

// import { useEffect, useState, useRef } from "react"
// import Image from "next/image"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react"

// const initialImages = [
//   "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-01-30%20at%2007.52.49@2x-zqF3XrkA8YEuxCPQcC8SBBsDUJVS9L.png",
//   "/placeholder.svg?height=200&width=300",
//   "/placeholder.svg?height=200&width=300",
//   "/placeholder.svg?height=200&width=300",
//   "/placeholder.svg?height=200&width=300",
//   "/placeholder.svg?height=200&width=300",
//   "/placeholder.svg?height=200&width=300",
//   "/placeholder.svg?height=200&width=300",
//   "/placeholder.svg?height=200&width=300",
// ]

// export function AutoCarousel() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [opacity, setOpacity] = useState(0)
//   const [images, setImages] = useState(initialImages)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const options: EmblaOptionsType = {
//     loop: true,
//     align: "start",
//     dragFree: true,
//     containScroll: "trimSnaps",
//   }

//   const [emblaRef1] = useEmblaCarousel({
//     ...options,
//     direction: "rtl",
//   })
//   const [emblaRef2] = useEmblaCarousel(options)
//   const [emblaRef3] = useEmblaCarousel({
//     ...options,
//     direction: "rtl",
//   })

//   useEffect(() => {
//     const handleScroll = () => {
//       const mainContainer = document.getElementById("main-container")
//       if (mainContainer) {
//         const mainContainerRect = mainContainer.getBoundingClientRect()
//         const scrollProgress = 1 - mainContainerRect.bottom / window.innerHeight

//         if (scrollProgress > 0) {
//           setIsVisible(true)
//           setOpacity(Math.min(scrollProgress * 2, 1))
//         } else {
//           setIsVisible(false)
//           setOpacity(0)
//         }
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files
//     if (files) {
//       const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
//       setImages((prevImages) => [...prevImages, ...newImages])
//     }
//   }

//   const triggerFileInput = () => {
//     fileInputRef.current?.click()
//   }

//   return (
//     <div
//       className={`fixed left-0 right-0 bottom-0 h-[900px] z-0 transition-all duration-500 ease-in-out ${
//         isVisible ? "translate-y-0" : "translate-y-full"
//       }`}
//       style={{ opacity }}
//     >
//       <Card className="w-full h-full bg-[#f8f8f8] backdrop-blur-sm p-8 overflow-hidden">
//         <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-center gap-8">
//           {[emblaRef1, emblaRef2, emblaRef3].map((ref, rowIndex) => (
//             <div key={rowIndex} className="overflow-hidden" ref={ref}>
//               <div className="flex gap-4 animate-slide-row">
//                 {images.map((image, index) => (
//                   <div
//                     key={index}
//                     className="flex-shrink-0 w-[300px] aspect-video bg-white rounded-lg shadow-md overflow-hidden"
//                   >
//                     <Image
//                       src={image || "/placeholder.svg"}
//                       alt={`Slideshow image ${rowIndex * 9 + index + 1}`}
//                       width={300}
//                       height={200}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleImageUpload}
//           accept="image/*"
//           multiple
//           className="hidden"
//         />
//         <Button onClick={triggerFileInput} className="absolute bottom-4 right-4 bg-blue-500 text-white">
//           <Plus className="mr-2 h-4 w-4" /> Add Images
//         </Button>
//       </Card>
//     </div>
//   )
// }
