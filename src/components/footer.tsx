"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="py-6 sm:py-8 md:py-10 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-wanted-poster opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-[#5e3023] text-center md:text-left text-sm sm:text-base font-western">
              © {currentYear} THANAKRIT PONGTANAWANNAGON. ALL RIGHTS RESERVED.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-[#5e3023] text-center md:text-right text-sm sm:text-base font-western mr-2">DESIGNED & BUILT WITH</p>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#d35400] fill-[#d35400]" />
            <p className="text-[#5e3023] text-center md:text-right text-sm sm:text-base font-western ml-2">BY THANAKRIT</p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}

