// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, useCallback } from "react"
// import Image from "next/image"
// import { ZoomIn, ZoomOut } from "lucide-react"

// interface ImagePosition {
//   id: string
//   src: string
//   x: number
//   y: number
// }

// export function ImageCanvas() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [opacity, setOpacity] = useState(0)
//   const [images, setImages] = useState<ImagePosition[]>([])
//   const [zoom, setZoom] = useState(2) // Default zoom set to 200%
//   const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const canvasRef = useRef<HTMLDivElement>(null)
//   const draggedImageRef = useRef<string | null>(null)

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
//       const newImages = Array.from(files).map((file) => ({
//         id: Math.random().toString(36).substr(2, 9),
//         src: URL.createObjectURL(file),
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//       }))
//       setImages((prevImages) => [...prevImages, ...newImages])
//     }
//   }

//   const triggerFileInput = () => {
//     fileInputRef.current?.click()
//   }

//   const handleZoom = useCallback(
//     (delta: number, clientX: number, clientY: number) => {
//       setZoom((prevZoom) => {
//         const newZoom = Math.max(0.5, Math.min(5, prevZoom + delta))

//         if (canvasRef.current) {
//           const rect = canvasRef.current.getBoundingClientRect()
//           const mouseX = clientX - rect.left
//           const mouseY = clientY - rect.top

//           const zoomPoint = {
//             x: (mouseX - panOffset.x) / prevZoom,
//             y: (mouseY - panOffset.y) / prevZoom,
//           }

//           const newPanOffset = {
//             x: mouseX - zoomPoint.x * newZoom,
//             y: mouseY - zoomPoint.y * newZoom,
//           }

//           setPanOffset(newPanOffset)
//         }

//         return newZoom
//       })
//     },
//     [panOffset],
//   )

//   const handleWheel = useCallback(
//     (event: WheelEvent) => {
//       event.preventDefault()
//       const delta = event.deltaY * -0.001
//       handleZoom(delta, event.clientX, event.clientY)
//     },
//     [handleZoom],
//   )

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (canvas) {
//       canvas.addEventListener("wheel", handleWheel, { passive: false })
//     }
//     return () => {
//       if (canvas) {
//         canvas.removeEventListener("wheel", handleWheel)
//       }
//     }
//   }, [handleWheel])

//   const handleMouseDown = (id: string) => (event: React.MouseEvent) => {
//     draggedImageRef.current = id
//   }

//   const handleMouseMove = useCallback(
//     (event: React.MouseEvent) => {
//       if (draggedImageRef.current && canvasRef.current) {
//         const canvasRect = canvasRef.current.getBoundingClientRect()
//         const x = ((event.clientX - canvasRect.left - panOffset.x) / (canvasRect.width * zoom)) * 100
//         const y = ((event.clientY - canvasRect.top - panOffset.y) / (canvasRect.height * zoom)) * 100

//         setImages((prevImages) =>
//           prevImages.map((img) => (img.id === draggedImageRef.current ? { ...img, x, y } : img)),
//         )
//       }
//     },
//     [zoom, panOffset],
//   )

//   const handleMouseUp = () => {
//     draggedImageRef.current = null
//   }

//   const handleDoubleClick = useCallback(
//     (image: ImagePosition) => (event: React.MouseEvent) => {
//       event.preventDefault()
//       if (canvasRef.current) {
//         const rect = canvasRef.current.getBoundingClientRect()
//         const targetZoom = 3 // Zoom level when double-clicking an image

//         const newPanOffset = {
//           x: rect.width / 2 - ((image.x * rect.width) / 100) * targetZoom,
//           y: rect.height / 2 - ((image.y * rect.height) / 100) * targetZoom,
//         }

//         setZoom(targetZoom)
//         setPanOffset(newPanOffset)
//       }
//     },
//     [],
//   )

//   return (
//     <div
//       className={`fixed left-0 right-0 bottom-0 h-[900px] z-0 transition-all duration-500 ease-in-out ${
//         isVisible ? "translate-y-0" : "translate-y-full"
//       }`}
//       style={{ opacity }}
//     >
//       <div
//         ref={canvasRef}
//         className="absolute inset-0 bg-gray-100 bg-opacity-50 overflow-hidden"
//         style={{
//           backgroundImage: "radial-gradient(circle, #000 1px, rgba(200, 200, 200, 0.3) 1px)",
//           backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
//           backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
//           transition: "background-size 0.3s ease-out, background-position 0.3s ease-out",
//         }}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       >
//         <div
//           style={{
//             transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
//             transformOrigin: "0 0",
//             transition: "transform 0.3s ease-out",
//             width: "100%",
//             height: "100%",
//             position: "relative",
//           }}
//         >
//           {images.map((image) => (
//             <div
//               key={image.id}
//               className="absolute"
//               style={{
//                 top: `${image.y}%`,
//                 left: `${image.x}%`,
//                 transform: "translate(-50%, -50%)",
//                 cursor: "move",
//               }}
//               onMouseDown={handleMouseDown(image.id)}
//               onDoubleClick={handleDoubleClick(image)}
//             >
//               <Image
//                 src={image.src || "/placeholder.svg"}
//                 alt={`Uploaded image`}
//                 width={200}
//                 height={200}
//                 className="rounded-lg shadow-md"
//                 style={{
//                   width: "200px",
//                   height: "auto",
//                   maxHeight: "200px",
//                   objectFit: "contain",
//                 }}
//                 draggable={false}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" multiple className="hidden" />
//       <div className="absolute bottom-4 right-4 flex gap-2">
//         <button
//           onClick={(e) => handleZoom(-0.1, e.clientX, e.clientY)}
//           className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
//           aria-label="Zoom out"
//         >
//           <ZoomOut size={24} />
//         </button>
//         <button
//           onClick={(e) => handleZoom(0.1, e.clientX, e.clientY)}
//           className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
//           aria-label="Zoom in"
//         >
//           <ZoomIn size={24} />
//         </button>
//         <button
//           onClick={triggerFileInput}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//         >
//           Add Images
//         </button>
//       </div>
//     </div>
//   )
// }
