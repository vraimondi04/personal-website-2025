// "use client"

// import { useEffect, useState, useRef } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// import Image from "next/image"
// import React from "react"

// interface SlideImage {
//   id: string
//   url: string
// }

// export function InfiniteSlideshow() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [opacity, setOpacity] = useState(0)
//   const [slideshowImages, setSlideshowImages] = useState<SlideImage[][]>([[], [], []])
//   const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

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

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
//     const files = event.target.files
//     if (files) {
//       const newImages = Array.from(files).map((file) => ({
//         id: Math.random().toString(36).substr(2, 9),
//         url: URL.createObjectURL(file),
//       }))

//       setSlideshowImages((prev) => {
//         const newState = [...prev]
//         newState[rowIndex] = [...newState[rowIndex], ...newImages]
//         return newState
//       })
//     }
//   }

//   const triggerFileInput = (index: number) => {
//     fileInputRefs[index].current?.click()
//   }

//   return (
//     <div
//       className={`fixed left-0 right-0 bottom-0 h-screen z-0 transition-all duration-500 ease-in-out ${
//         isVisible ? "translate-y-0" : "translate-y-full"
//       }`}
//       style={{ opacity }}
//     >
//       <Card className="w-full h-full bg-[#fafafa] p-6 overflow-visible">
//         <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-between gap-9">
//           {[0, 1, 2].map((rowIndex) => (
//             <div key={rowIndex} className="relative overflow-visible h-[28vh]">
//               <div className="absolute inset-0 flex gap-9" style={{ width: "200%" }}>
//                 <div className="flex gap-9 animate-loop-left-to-right">
//                   {slideshowImages[rowIndex].length > 0
//                     ? [...slideshowImages[rowIndex], ...slideshowImages[rowIndex]].map((image, index) => (
//                         <div
//                           key={`${image.id}-${index}`}
//                           className="flex-shrink-0 w-[300px] h-[28vh] rounded-lg overflow-hidden"
//                         >
//                           <Image
//                             src={image.url || "/placeholder.svg"}
//                             alt={`Slideshow image ${index + 1}`}
//                             width={300}
//                             height={224}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))
//                     : Array.from({ length: 8 }).map((_, index) => (
//                         <div
//                           key={index}
//                           className="flex-shrink-0 w-[300px] h-[28vh] rounded-lg bg-[#fee5e5] animate-loop-left-to-right"
//                         />
//                       ))}
//                 </div>
//                 <div className="flex gap-9 animate-loop-left-to-right">
//                   {slideshowImages[rowIndex].length > 0
//                     ? [...slideshowImages[rowIndex], ...slideshowImages[rowIndex]].map((image, index) => (
//                         <div
//                           key={`${image.id}-${index}-duplicate`}
//                           className="flex-shrink-0 w-[300px] h-[28vh] rounded-lg overflow-hidden"
//                         >
//                           <Image
//                             src={image.url || "/placeholder.svg"}
//                             alt={`Slideshow image ${index + 1}`}
//                             width={300}
//                             height={224}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))
//                     : Array.from({ length: 8 }).map((_, index) => (
//                         <div
//                           key={`${index}-duplicate`}
//                           className="flex-shrink-0 w-[300px] h-[28vh] rounded-lg bg-[#fee5e5] animate-loop-left-to-right"
//                         />
//                       ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {[0, 1, 2].map((index) => (
//           <React.Fragment key={index}>
//             <input
//               type="file"
//               ref={fileInputRefs[index]}
//               onChange={(e) => handleImageUpload(e, index)}
//               accept="image/*"
//               multiple
//               className="hidden"
//             />
//             <Button
//               onClick={() => triggerFileInput(index)}
//               className={`absolute bottom-6 ${
//                 index === 0 ? "right-6" : index === 1 ? "right-[120px]" : "right-[234px]"
//               } bg-[#ffffff] hover:bg-[#ffffff]/90 text-[#000000]`}
//             >
//               <Plus className="mr-2 h-4 w-4" /> Add to Row {index + 1}
//             </Button>
//           </React.Fragment>
//         ))}
//       </Card>
//     </div>
//   )
// }
