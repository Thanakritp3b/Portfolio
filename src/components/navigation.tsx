"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 300

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? "auto" : "hidden"
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "py-2 sm:py-3 bg-[#f5f0e1]/90 backdrop-blur-md border-b-4 border-[#8b4513]" : "py-4 sm:py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 2.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <motion.div
            className="text-xl sm:text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.7 }}
          >
            <a
              href="#home"
              className="text-[#5e3023] hover:text-[#d35400] transition-colors relative group font-western"
              data-cursor="HOME"
            >
              <span className="relative">
                Thanakrit.P
                <Image
                  src="/cowboy-hat.png"
                  alt="Cowboy hat"
                  width={32}
                  height={20}
                  className="absolute -top-4 sm:-top-5 -right-5 sm:-right-6 w-6 sm:w-8 h-auto transform rotate-12"
                />
              </span>
            </a>
          </motion.div>

          <div className="hidden md:flex space-x-4 lg:space-x-8">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 2.7 + i * 0.1 }}
              >
                <a
                  href={item.href}
                  className={`text-sm font-bold transition-colors relative font-western cursor-lasso-small ${
                    activeSection === item.href.substring(1) ? "text-[#d35400]" : "text-[#5e3023] hover:text-[#d35400]"
                  }`}
                  data-cursor={item.name.toUpperCase()}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-1 bg-[#d35400]"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="z-50 relative md:hidden"
            onClick={toggleMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.7 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            data-cursor={isOpen ? "CLOSE" : "MENU"}
          >
            <div className="w-8 sm:w-10 h-6 sm:h-8 flex flex-col justify-between">
              <span
                className={`h-1 w-full bg-[#5e3023] rounded-full transform transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5 sm:translate-y-3.5" : ""}`}
              ></span>
              <span
                className={`h-1 w-full bg-[#5e3023] rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`h-1 w-full bg-[#5e3023] rounded-full transform transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5 sm:-translate-y-3.5" : ""}`}
              ></span>
            </div>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-[#f5f0e1] flex items-center justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 bg-wanted-poster opacity-5 pointer-events-none"></div>
            <nav className="container mx-auto px-4 sm:px-6">
              <ul className="space-y-4 sm:space-y-6 text-center">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#5e3023] hover:text-[#d35400] transition-colors inline-block font-western cursor-lasso-small"
                      onClick={closeMenu}
                      data-cursor={item.name.toUpperCase()}
                    >
                      <span className="relative group">
                        {item.name}
                        <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-0 h-0.5 sm:h-1 bg-[#d35400] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

