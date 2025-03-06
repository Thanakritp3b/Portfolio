"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

// Define the Achievement type based on the Prisma schema
type Achievement = {
  id: string
  title: string
  organization?: string | null
  year?: string | null
  description?: string | null
  imageUrl?: string | null
  createdAt: string
  updatedAt: string
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements')
        if (!response.ok) {
          throw new Error('Failed to fetch achievements')
        }
        const data = await response.json()
        setAchievements(data)
      } catch (err) {
        console.error('Error fetching achievements:', err)
        setError('Failed to load achievements. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-12 md:py-20 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#5e3023] font-western">ABOUT ME</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-[#5e3023]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                I am a <span className="text-[#d35400] font-bold">Data Science student</span> at Harbour.Space@UTCC with
                a passion for problem-solving and building impactful solutions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Currently working as a <span className="text-[#8b4513] font-bold">Back-end Developer</span> at Leagues
                of Code TH, I specialize in developing robust and efficient applications using modern frameworks and
                technologies.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                My journey in technology began with competitive programming and has evolved into a deep interest in
                machine learning and data science.
              </motion.p>
            </div>

            <motion.div
              className="mt-6 sm:mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a
                href="#experience"
                className="px-6 sm:px-8 py-2 sm:py-3 bg-[#f5f0e1] rounded-md text-[#5e3023] font-bold hover:bg-[#e8e0ce] transition-all inline-flex items-center border-2 border-[#8b4513] font-western text-sm sm:text-base"
                data-cursor="EXPERIENCE"
              >
                VIEW MY EXPERIENCE
                <svg
                  className="ml-2 w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-[#f5f0e1] p-4 sm:p-6 rounded-md border-4 border-[#8b4513] hover:border-[#d35400] transition-colors relative"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#5e3023] font-western">EDUCATION</h4>
              <p className="text-[#5e3023] text-sm sm:text-base">
                Bachelor of Science in Data Science at Harbour.Space@UTCC (2024 - Present)
              </p>
              <p className="text-[#5e3023] text-sm sm:text-base mt-2">
                SCiUS Program at Demonstration School of Khon Kaen University (2021 - 2023)
              </p>
            </motion.div>

            <motion.div
              className="bg-[#f5f0e1] p-4 sm:p-6 rounded-md border-4 border-[#8b4513] hover:border-[#d35400] transition-colors relative"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#5e3023] font-western">ACHIEVEMENTS</h4>
              
              {loading ? (
                <p className="text-[#5e3023] text-sm sm:text-base">Loading achievements...</p>
              ) : error ? (
                <p className="text-[#d35400] text-sm sm:text-base">{error}</p>
              ) : (
                <ul className="space-y-2 text-[#5e3023]">
                  {achievements.map((achievement) => (
                    <li key={achievement.id} className="flex items-start">
                      {achievement.imageUrl ? (
                        <Image
                          src={achievement.imageUrl}
                          alt={achievement.title}
                          width={16}
                          height={16}
                          className="w-4 h-4 sm:w-5 sm:h-5 object-contain mt-1 mr-2"
                        />
                      ) : (
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#d35400] mt-1 mr-2 flex-shrink-0" />
                      )}
                      <div>
                        <span className="font-bold">{achievement.title}</span>
                        {achievement.organization && (
                          <span>, {achievement.organization}</span>
                        )}
                        {achievement.year && (
                          <span>, {achievement.year}</span>
                        )}
                        {achievement.description && (
                          <p className="text-xs sm:text-sm text-[#8b4513] mt-1">{achievement.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

