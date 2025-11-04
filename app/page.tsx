"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { RealTimeClock } from "@/components/RealTimeClock"
import { Ticker } from "@/components/Ticker"
import { useState, useEffect } from "react"
import { TypeAnimation } from "react-type-animation"

const socialLinks = [
  {
    label: "Email",
    href: "mailto:vincentraimondi04@gmail.com"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vincentraimondi/",
  },
  {
    label: "GitHub",
    href: "https://github.com/vraimondi04",
  },
]

const experiences = [
  {
    company: "UPS",
    period: "Aug 2023 - Present",
    description: "Software Development Engineer on the Mail and Package Solutions team.",
    cursor: "cursor-ups"
  },
  {
    company: "Northwestern Mutual",
    period: "June 2022 - Sep 2022",
    description: "Software Engineer Intern on the Engineering Solutions Delivery division.",
    cursor: "cursor-nm"
  },
]

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative flex flex-col items-center bg-white min-h-screen">
      <div
        id="main-container"
        className="w-full min-h-screen bg-white z-10 px-4 sm:px-6 md:px-8 py-6 sm:py-8 mb-[1500px] transition-all duration-500 ease-in-out shadow-[0_0_20px_rgba(0,0,0,0.1)]"
      >
        <Card className="border-none bg-transparent mb-8 sm:mb-16 w-full max-w-[400px] mx-auto shadow-none">
          <CardContent className="flex flex-col gap-8 sm:gap-12 p-0 sm:p-4">
            <Header isLoaded={isLoaded} />
            <Description isLoaded={isLoaded} />
            <ProjectButton isLoaded={isLoaded} />
            <Experience isLoaded={isLoaded} experiences={experiences} />
            <SocialLinks isLoaded={isLoaded} links={socialLinks} />
            <ClockWrapper isLoaded={isLoaded} />
          </CardContent>
        </Card>
      </div>
      <Ticker />
    </main>
  )
}

function Header({ isLoaded }: { isLoaded: boolean }) {
  return (
    <header
      className={`flex flex-col gap-1.5 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">Vincent Raimondi</h1>
      <p className="text-sm font-medium text-[#62748e]">Software Developer +
        <span>
          <TypeAnimation 
              sequence={[
                " Creative",
                4000,
                " Pokemon Trainer",
                4000,
              ]}
              speed={45}
              deletionSpeed={45}
              cursor={true}
              repeat={Infinity}
              preRenderFirstString={true}
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-blue-500"
            />
        </span>
      </p>
    </header>
  )
}

function Description({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div
      className={`flex flex-col gap-4 sm:gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "200ms" }}
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        <p className="text-sm text-neutral-900">
          Hello there! I'm Vincent — welcome to my website! I work as a software engineer by day, and study CS @ Georgia Tech at night. I love shaping ideas into interactive experiences that solve real problems and inspire curiosity.
        </p>
        <p className="text-sm text-neutral-900">
          From intuitive web applications to creative side projects, I’m always exploring how design and technology can tell better stories and connect people in new ways.
        </p>
      </div>
    </div>
  )
}

function ProjectButton({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2.5 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "300ms" }}
    >
      <Button
        variant="default"
        className="w-full sm:w-auto inline-flex h-[34px] items-center justify-center gap-2.5 pl-4 pr-3 py-0 bg-[#020618] rounded-[99px] hover:bg-[#020618]/90 text-slate-50 cursor-wip"
      >
        <span className="font-medium text-[13px] leading-5 text-slate-50">See what I've built</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" className="text-slate-50">
          <title>chevron-right</title>
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor">
            <polyline points="4.25 10.25 8.5 6 4.25 1.75"></polyline>
          </g>
        </svg>
      </Button>
      <Button variant="ghost" className="w-full sm:w-auto gap-2 justify-center sm:justify-start">
        <span className="h-[13px] w-[13px] rounded-full bg-[#05df7233] flex items-center justify-center overflow-hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-scale-in" />
        </span>
        <span className="text-[13px] leading-5 text-black">Work in Progress </span>
      </Button>
    </div>
  )
}

function Experience({ isLoaded, experiences }: { isLoaded: boolean; experiences: typeof experiences }) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "400ms" }}
    >
      <h2 className="text-sm text-neutral-400 uppercase">EXPERIENCE</h2>
      <div className="flex flex-col gap-6">
        {experiences.map((exp) => (
          <div key={exp.company} className={`flex flex-col gap-1 ${exp.cursor}`} >
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-neutral-900">{exp.company}</span>
              <span className="text-sm text-neutral-500">{exp.period}</span>
            </div>
            <p className="text-sm text-neutral-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SocialLinks({ isLoaded, links }: { isLoaded: boolean; links: typeof socialLinks }) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "500ms" }}
    >
      <h2 className="text-sm text-neutral-400 uppercase">LET'S GET IN TOUCH</h2>
      <div className="flex flex-wrap gap-6">
        {links.map((link) => (
          <div key={link.label} className="group">
            {
              <a
                href={link.href}
                className="text-sm text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-1 group"
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

function ClockWrapper({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div
      className={`flex justify-start w-full transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "600ms" }}
    >
      <RealTimeClock />
    </div>
  )
}
