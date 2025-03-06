"use client"

import dynamic from "next/dynamic"

// Dynamically import components to enable smooth loading
const LoadingScreen = dynamic(() => import("@/components/loading-screen"), { ssr: false })
const RetroMouse = dynamic(() => import("@/components/retro-mouse"), { ssr: false })
const Navigation = dynamic(() => import("@/components/navigation"), { ssr: false })
const ScrollProgress = dynamic(() => import("@/components/scroll-progress"), { ssr: false })
const Hero = dynamic(() => import("@/components/hero"), { ssr: false })
const About = dynamic(() => import("@/components/about"), { ssr: false })
const Experience = dynamic(() => import("@/components/experience"), { ssr: false })
const Projects = dynamic(() => import("@/components/projects"), { ssr: false })
const Skills = dynamic(() => import("@/components/skills"), { ssr: false })
const Contact = dynamic(() => import("@/components/contact"), { ssr: false })
const Footer = dynamic(() => import("@/components/footer"), { ssr: false })

export default function ClientPage() {
  return (
    <main className="relative bg-[#f5f0e1] text-[#5e3023] min-h-screen overflow-hidden font-western">
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none z-0"></div>
      <LoadingScreen />
      <RetroMouse />
      <ScrollProgress />
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </main>
  )
} 