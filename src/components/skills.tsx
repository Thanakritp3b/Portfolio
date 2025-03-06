"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Code2, Globe, Brain, Server, Database, Cpu, Github } from "lucide-react"
import React from "react"

const skills = [
  {
    category: "Programming Languages",
    items: ["C", "C++", "Python", "Java"],
    icon: Code2,
    color: "border-[#d35400]",
  },
  {
    category: "Web Development",
    items: ["Back-end Development", "Database Management", "Nest.js", "Next.js", "PostgreSQL"],
    icon: Globe,
    color: "border-[#8b4513]",
  },
  {
    category: "Problem-Solving",
    items: ["Competitive Programming", "Algorithm Design"],
    icon: Brain,
    color: "border-[#d35400]",
  },
  {
    category: "Backend",
    items: ["API Development", "Server Management", "Authentication", "Authorization"],
    icon: Server,
    color: "border-[#8b4513]",
  },
  {
    category: "Database",
    items: ["SQL", "PostgreSQL", "Database Design", "Query Optimization"],
    icon: Database,
    color: "border-[#d35400]",
  },
  {
    category: "Other",
    items: ["Git", "Docker", "Linux", "Machine Learning"],
    icon: Cpu,
    color: "border-[#8b4513]",
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section
      id="skills"
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
            <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6">
              <Image src="/gun.png" alt="Sheriff Badge" width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#5e3023] font-western">MY SKILLS</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className={`bg-[#f5f0e1] rounded-md overflow-hidden border-4 ${skill.color} hover:border-[#d35400] transition-colors`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[#f5f0e1] p-2 sm:p-3 rounded-md border-2 border-[#8b4513] mr-3 sm:mr-4 flex-shrink-0">
                    {React.createElement(skill.icon, {
                      size: 24,
                      className: "text-[#5e3023]"
                    })}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#5e3023] font-western">{skill.category}</h3>
                </div>

              <ul className="space-y-2">
                {skill.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center text-[#5e3023]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src="/bullet-star.png"
                      alt="Bullet"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain mr-2"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

