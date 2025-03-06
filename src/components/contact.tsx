"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Send, Loader2, Mail, Phone, MapPin, Github, Linkedin, CheckCircle, Instagram } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      id="contact"
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#5e3023] font-western">GET IN TOUCH</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-[#5e3023] font-western">CONTACT INFORMATION</h3>

            <div className="space-y-4 md:space-y-6 mb-6 md:mb-10">
              <div className="flex items-start">
                <div className="bg-[#f5f0e1] p-2 sm:p-3 rounded-md border-2 border-[#8b4513] mr-3 md:mr-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#5e3023]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#5e3023]">Email</h4>
                  <p className="text-[#8b4513] text-sm sm:text-base break-all">thanakrit03b@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#f5f0e1] p-2 sm:p-3 rounded-md border-2 border-[#8b4513] mr-3 md:mr-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#5e3023]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#5e3023]">Phone</h4>
                  <p className="text-[#8b4513] text-sm sm:text-base">+66 64 462 3372</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#f5f0e1] p-2 sm:p-3 rounded-md border-2 border-[#8b4513] mr-3 md:mr-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#5e3023]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#5e3023]">Location</h4>
                  <p className="text-[#8b4513] text-sm sm:text-base">Bangkok, Thailand</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-[#5e3023] font-western">FOLLOW ME</h3>
            <div className="flex space-x-3 md:space-x-4">
              <motion.a
                href="https://github.com/Thanakritp3b"
                className="bg-[#f5f0e1] p-2 sm:p-3 rounded-md border-2 border-[#8b4513] hover:border-[#d35400] transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="GITHUB"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-[#5e3023]" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/thanakrit-pongtanawannagon-aabb97310/"
                className="bg-[#f5f0e1] p-2 sm:p-3 rounded-md border-2 border-[#8b4513] hover:border-[#d35400] transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="LINKEDIN"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-[#5e3023]" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/thanakriittp/"
                className="bg-[#f5f0e1] p-2 sm:p-3 rounded-md border-2 border-[#8b4513] hover:border-[#d35400] transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="INSTAGRAM"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#5e3023]" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 mb-8 md:mb-0"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-[#5e3023] font-western">SEND A MESSAGE</h3>

            {isSubmitted ? (
              <motion.div
                className="bg-[#f5f0e1] p-4 sm:p-6 rounded-md border-4 border-[#d35400] text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#f5f0e1] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border-2 border-[#d35400]">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#d35400]" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#5e3023] mb-2 font-western">MESSAGE SENT!</h4>
                <p className="text-[#8b4513] text-sm sm:text-base">Thank you for your message. I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {error && (
                  <motion.div
                    className="bg-[#f5f0e1] p-4 rounded-md border-4 border-red-500 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-red-500 text-sm sm:text-base font-bold">{error}</p>
                  </motion.div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[#5e3023] mb-1 font-western">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#f5f0e1] rounded-md border-2 border-[#8b4513] focus:border-[#d35400] focus:outline-none text-[#5e3023]"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[#5e3023] mb-1 font-western">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#f5f0e1] rounded-md border-2 border-[#8b4513] focus:border-[#d35400] focus:outline-none text-[#5e3023]"
                    placeholder="Your email"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[#5e3023] mb-1 font-western">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#f5f0e1] rounded-md border-2 border-[#8b4513] focus:border-[#d35400] focus:outline-none text-[#5e3023]"
                    placeholder="Your message"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#d35400] rounded-md text-white font-bold flex items-center justify-center disabled:opacity-70 border-2 border-[#8b4513] font-western text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  data-cursor="SEND"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white" />
                      SEND MESSAGE
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

