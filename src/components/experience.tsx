"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

// Define the Experience type based on the Prisma schema
type Experience = {
  id: string
  imageUrl: string
  title: string
  company: string
  period: string
  description: string
  createdAt: string
  updatedAt: string
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experiences')
        if (!response.ok) {
          throw new Error('Failed to fetch experiences')
        }
        const data = await response.json()
        setExperiences(data)
      } catch (err) {
        console.error('Error fetching experiences:', err)
        setError('Failed to load experiences. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-12 md:py-20 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{ y, opacity }}
    >
      <div className="absolute inset-0 bg-wanted-poster opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="flex flex-col items-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#5e3023] font-western">MY JOURNEY</h2>
            <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2">
              <Image
                src="/cowboy-hat.png"
                alt="Cowboy hat"
                width={64}
                height={40}
                className="w-12 h-8 sm:w-16 sm:h-10 object-contain"
              />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-[#5e3023] font-western text-xl">Loading experiences...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-[#d35400] font-western text-xl">{error}</div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="mb-8 sm:mb-12 md:mb-16 last:mb-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6">
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-[#f5f0e1] flex items-center justify-center border-4 border-[#8b4513] flex-shrink-0"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image
                        src={exp.imageUrl}
                        alt="Briefcase"
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 sm:mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#5e3023] font-western">{exp.title}</h3>
                        <div className="flex items-center text-[#8b4513] mt-1 md:mt-0 font-bold text-sm sm:text-base">
                          {exp.period}
                        </div>
                      </div>

                      <h4 className="text-lg sm:text-xl text-[#d35400] mb-2 sm:mb-4 font-bold">{exp.company}</h4>
                      <p className="text-[#5e3023] text-sm sm:text-base">{exp.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  )
}

