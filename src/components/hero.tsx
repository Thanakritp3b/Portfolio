"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Link as LinkIcon } from "lucide-react"
import React from "react"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const images = [
    "https://tzomxomgglrywbsulrtm.supabase.co/storage/v1/object/public/assets/me/LOCTH_Staff_Pic-205.jpg",
    "https://tzomxomgglrywbsulrtm.supabase.co/storage/v1/object/public/assets/me/LOCTH_Staff_Pic-198.jpg",
    "https://tzomxomgglrywbsulrtm.supabase.co/storage/v1/object/public/assets/me/LOCTH_Staff_Pic-191.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current) return

      const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      imageContainerRef.current.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`
    }

    const handleMouseLeave = () => {
      if (!imageContainerRef.current) return
      imageContainerRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"
    }

    const element = imageContainerRef.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
      element.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
        element.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  const socialLinks = [
    { 
      icon: Github,
      href: "https://github.com/Thanakritp3b",
      label: "GitHub",
      hoverColor: "hover:border-[#d35400]"
    },
    { 
      icon: Linkedin,
      href: "https://www.linkedin.com/in/thanakrit-pongtanawannagon-aabb97310/",
      label: "LinkedIn",
      hoverColor: "hover:border-[#d35400]"
    },
    { 
      icon: LinkIcon,
      href: "#",
      label: "Portfolio",
      hoverColor: "hover:border-[#d35400]"
    },
  ]

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative py-12 md:py-20"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#5e3023] mb-4 font-western"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              THANAKRIT PONGTANAWANNAGON
            </motion.h1>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d35400] mb-2 font-western">
                DATA SCIENCE STUDENT & BACK-END DEVELOPER
              </h2>
              <p className="text-[#5e3023] text-sm sm:text-base md:text-lg max-w-2xl">
                Passionate about creating efficient and scalable backend solutions. Experienced in API development,
                database management, and server optimization. Currently exploring the intersection of data science and
                web development.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-[#d35400] text-white font-bold rounded-md border-2 border-[#8b4513] hover:bg-[#e67e22] transition-colors font-western text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="HIRE ME"
              >
                HIRE ME
              </motion.a>
              <motion.a
                href="#projects"
                className="px-6 py-3 bg-[#f5f0e1] text-[#5e3023] font-bold rounded-md border-2 border-[#8b4513] hover:bg-[#e8e0ce] transition-colors font-western text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="PROJECTS"
              >
                VIEW PROJECTS
              </motion.a>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.3 }}
            >
              <span className="text-[#5e3023] text-sm font-bold font-western">Find me on:</span>
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className={`w-10 h-10 rounded-md bg-[#f5f0e1] flex items-center justify-center border-2 border-[#8b4513] ${link.hoverColor} transition-all transform hover:-translate-y-1`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {React.createElement(link.icon, {
                    size: 24,
                    className: "text-[#5e3023]"
                  })}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            ref={imageContainerRef}
            className="order-1 lg:order-2 relative transition-transform duration-300 ease-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.7 }}
            style={{ transformStyle: "preserve-3d", y }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 border-8 border-[#8b4513] rounded-md -rotate-3 transform-gpu"></div>
              <div className="absolute inset-0 border-8 border-[#d35400] rounded-md rotate-3 transform-gpu"></div>

              {images.map((src, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 rounded-md overflow-hidden border-4 border-[#5e3023]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    scale: index === currentImageIndex ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${index * 10}px)`,
                  }}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Profile image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5e3023]/30 to-transparent" />
                </motion.div>
              ))}

              <div className="absolute -bottom-5 -right-5 w-24 h-24">
                {/* Sheriff badge icons created by Ina Mella - Flaticon (https://www.flaticon.com/free-icons/sheriff-badge) */}
                <Image
                  src="/sheriff-badge.png"
                  alt="Sheriff badge by Ina Mella - Flaticon"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ArrowDown className="text-[#d35400]" size={24} />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

