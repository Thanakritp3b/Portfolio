"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function RetroMouse() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  useEffect(() => {
    const handleMouseOver = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const cursorData = target.getAttribute("data-cursor")

      if (cursorData) {
        setCursorText(cursorData)
        setCursorVariant("text")
      } else {
        setCursorText("")
        setCursorVariant("hover")
      }
    }

    const handleMouseOut = () => {
      setCursorText("")
      setCursorVariant("default")
    }

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), [data-cursor]',
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver)
      el.addEventListener("mouseout", handleMouseOut)
    })

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver)
        el.removeEventListener("mouseout", handleMouseOut)
      })
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
    },
  }

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none"

    return () => {
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
      </motion.div>
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center text-[#5e3023] font-western text-sm"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: mousePosition.x - 75,
            y: mousePosition.y - 75,
            width: 150,
            height: 150,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  )
}

