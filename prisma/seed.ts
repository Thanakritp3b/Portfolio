import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.project.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.socialLink.deleteMany()
  await prisma.achievement.deleteMany()

  // Create projects
  await prisma.project.createMany({
    data: [
      {
        title: "Harbour.Space@UTCC Room Reservation System",
        role: "Head of Backend Developer",
        shortDescription: "A system for room reservations at Harbour.Space@UTCC.",
        description:
          "Led the backend development team for a comprehensive room reservation system at Harbour.Space@UTCC. Designed and implemented RESTful APIs, database schema, and authentication systems. Optimized database queries for performance and implemented caching strategies to ensure scalability under high load. Collaborated closely with the frontend team to ensure seamless integration and user experience.",
        imageUrl: "/placeholder.svg?height=600&width=800",
        liveUrl: "https://example.com/project1",
        githubUrl: "https://github.com/username/project1",
        tags: ["Node.js", "NestJS", "PostgreSQL", "TypeScript"],
        featured: true,
      },
      {
        title: "Subway Surfers in Real Life",
        role: "Developer",
        shortDescription: "Created a program that plays Subway Surfers in real life.",
        description:
          "Developed an innovative computer vision application that translates real-world physical movements into in-game actions for Subway Surfers. Implemented body tracking algorithms using OpenCV and machine learning to detect jumping, stepping left/right, and ducking movements. Created a seamless interface between the physical world and the game, allowing players to control the game character with their body movements in real-time. Optimized the system for low latency to ensure responsive gameplay.",
        imageUrl: "/placeholder.svg?height=600&width=800",
        githubUrl: "https://github.com/username/project2",
        tags: ["Python", "OpenCV", "Machine Learning"],
        featured: false,
      },
    ],
  })

  // Create experiences
  await prisma.experience.createMany({
    data: [
      {
        title: "Back-end Developer",
        company: "Leagues of Code TH",
        period: "2024 - Present",
        description:
          "Developing and maintaining back-end systems using modern frameworks and technologies. Collaborating with front-end developers and data scientists to deliver robust and efficient applications.",
        imageUrl: "/briefcase.png",
      },
      {
        title: "C++ Teacher",
        company: "Leagues of Code TH",
        period: "2024 - Present",
        description:
          "Teaching high school students programming languages and problem-solving techniques. Creating lesson plans and coding challenges to enhance students' understanding of algorithms and data structures.",
        imageUrl: "/briefcase.png",
      },
      {
        title: "C++ Tutor",
        company: "Demonstration School of Khon Kaen University",
        period: "2022 - 2023",
        description:
          "Created lesson plans to enhance students' understanding of mathematics, algorithms and data structures. Provided mentorship and guidance to students in preparing for academic projects.",
        imageUrl: "/briefcase.png",
      },
    ],
  })

  // Create achievements
  await prisma.achievement.createMany({
    data: [
      {
        title: "1st Place, CTF Competition",
        organization: "Khon Kaen University",
        year: "2023",
        description: "Won first place in the Capture The Flag cybersecurity competition.",
        imageUrl: "https://tzomxomgglrywbsulrtm.supabase.co/storage/v1/object/public/assets/logo/kku.png",
      },
      {
        title: "Finalist, Engineering Quest",
        organization: "King Mongkut's University",
        year: "2023",
        description: "Reached the finals of the Engineering Quest competition.",
        imageUrl: "/bullet-star.svg",
      },
      {
        title: "Top 2 project of Energy, Environment & Material",
        organization: "North-eastern Thailand",
        year: "2023",
        description: "Recognized as one of the top projects in the region.",
        imageUrl: "/bullet-star.svg",
      },
    ],
  })

  // Create social links
  await prisma.socialLink.createMany({
    data: [
      {
        platform: "GitHub",
        url: "https://github.com/yourusername",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/yourusername",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/yourusername",
      },
    ],
  })

  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 