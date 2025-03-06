"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollPercentage(Math.round(latest * 100))
    })
  }, [scrollYProgress])

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-[#d35400] origin-left z-50" style={{ scaleX }} />
      <motion.div
        className="fixed bottom-8 right-8 bg-[#5e3023] text-[#f5f0e1] rounded-md px-3 py-1 text-xs font-pixel z-40 border-2 border-[#8b4513]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        {scrollPercentage}%
      </motion.div>
    </>
  )
}

