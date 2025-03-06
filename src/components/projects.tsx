"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Code2, Github, Link as LinkIcon } from "lucide-react"

// Define the Project type based on the Prisma schema
type Project = {
  id: string
  title: string
  role?: string | null
  shortDescription?: string | null
  description: string
  imageUrl: string
  liveUrl?: string | null
  githubUrl?: string | null
  codeUrl?: string | null
  tags: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section
      id="projects"
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#5e3023] font-western">MY PROJECTS</h2>
            <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 transform rotate-12">
              <Image
                src="/cursor-lasso.png"
                alt="Lasso Cursor"
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-[#5e3023] font-western text-xl">Loading projects...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-[#d35400] font-western text-xl">{error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-[#f5f0e1] rounded-md overflow-hidden border-4 border-[#8b4513] hover:border-[#d35400] transition-colors relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="h-40 sm:h-48 bg-[#e8e0ce] relative overflow-hidden">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5e3023]/70 to-transparent flex items-end">
                    <div className="p-3 sm:p-4 text-white">
                      <h3 className="text-lg sm:text-xl font-bold font-western">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-[#f5f0e1]">{project.role}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="text-[#5e3023] mb-4 text-sm sm:text-base">{project.shortDescription || project.description.substring(0, 150) + '...'}</p>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-bold text-[#8b4513] mb-2 font-western">TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tech, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 bg-[#d35400] text-white rounded-md text-xs sm:text-sm font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 sm:gap-3">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          className="p-1.5 sm:p-2 rounded-md bg-[#f5f0e1] border-2 border-[#8b4513] hover:bg-[#e8e0ce] transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          data-cursor="VISIT"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e3023]" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          className="p-1.5 sm:p-2 rounded-md bg-[#f5f0e1] border-2 border-[#8b4513] hover:bg-[#e8e0ce] transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          data-cursor="GITHUB"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e3023]" />
                        </motion.a>
                      )}
                      {project.codeUrl && (
                        <motion.a
                          href={project.codeUrl}
                          className="p-1.5 sm:p-2 rounded-md bg-[#f5f0e1] border-2 border-[#8b4513] hover:bg-[#e8e0ce] transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          data-cursor="CODE"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e3023]" />
                        </motion.a>
                      )}
                    </div>

                    <motion.button
                      onClick={() => setSelectedProject(index)}
                      className="text-xs sm:text-sm text-[#d35400] hover:text-[#e67e22] transition-colors font-bold font-western"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="DETAILS"
                    >
                      VIEW DETAILS
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject !== null && projects[selectedProject] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#5e3023]/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[#f5f0e1] rounded-md p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-[#8b4513]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#5e3023] mb-1 font-western">
                    {projects[selectedProject].title}
                  </h3>
                  <p className="text-[#d35400] font-bold text-sm sm:text-base">{projects[selectedProject].role}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 sm:p-2 rounded-md bg-[#f5f0e1] border-2 border-[#8b4513] hover:bg-[#e8e0ce] transition-colors"
                  data-cursor="CLOSE"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#5e3023]" />
                </button>
              </div>

              <div className="mb-4 sm:mb-6 rounded-md overflow-hidden border-2 border-[#8b4513]">
                <img
                  src={projects[selectedProject].imageUrl}
                  alt={projects[selectedProject].title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-bold text-[#5e3023] mb-2 font-western">DESCRIPTION</h4>
                <p className="text-[#5e3023] text-sm sm:text-base">{projects[selectedProject].description}</p>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-bold text-[#5e3023] mb-2 font-western">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tags.map((tech, idx) => (
                    <span key={idx} className="px-2 sm:px-3 py-1 bg-[#d35400] text-white rounded-md text-xs sm:text-sm font-bold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {projects[selectedProject].liveUrl && (
                  <a
                    href={projects[selectedProject].liveUrl}
                    className="px-3 sm:px-4 py-2 bg-[#d35400] rounded-md text-white font-bold hover:bg-[#e67e22] transition-all flex items-center border-2 border-[#8b4513] font-western text-xs sm:text-sm"
                    data-cursor="VISIT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white" />
                    VISIT PROJECT
                  </a>
                )}
                {projects[selectedProject].githubUrl && (
                  <a
                    href={projects[selectedProject].githubUrl}
                    className="px-3 sm:px-4 py-2 bg-[#f5f0e1] rounded-md text-[#5e3023] font-bold hover:bg-[#e8e0ce] transition-all flex items-center border-2 border-[#8b4513] font-western text-xs sm:text-sm"
                    data-cursor="GITHUB"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#5e3023]" />
                    VIEW CODE
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

