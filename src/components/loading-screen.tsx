"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const fullText = "LOADING TALENTED BOYS..."

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    // Text animation
    let currentIndex = 0
    const textInterval = setInterval(() => {
      setText(fullText.substring(0, currentIndex))
      currentIndex++
      if (currentIndex > fullText.length) {
        clearInterval(textInterval)
      }
    }, 100)

    // Simulate loading completion
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f0e1]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-3xl md:text-5xl font-bold text-[#5e3023] relative font-western">
              <span className="relative z-10">{text}</span>
              <span className="absolute top-0 left-[calc(100%+4px)] h-full w-0.5 bg-[#5e3023] animate-blink"></span>
            </div>
          </motion.div>

          <div className="w-64 h-8 border-4 border-[#5e3023] rounded-md overflow-hidden relative mb-6">
            <motion.div
              className="h-full bg-[#d35400] rounded-sm"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-md font-pixel">{progress}%</span>
            </div>
          </div>

          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="w-3 h-3 bg-[#d35400] rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0,
              }}
            />
            <motion.div
              className="w-3 h-3 bg-[#d35400] rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-3 h-3 bg-[#d35400] rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

