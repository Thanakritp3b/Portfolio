import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Thanakrit Pongtanawannagon | Portfolio",
  description: "Data Science student and Back-end Developer",
}

export default function Home() {
  return <ClientPage />
}

