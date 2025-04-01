"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about-section")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 border-b border-neutral-50/10">
      {/* Gradient background - estático y centrado */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(200, 200, 200, 0.15), transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(200, 200, 200, 0.1), transparent 70%)
          `,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl mb-2 text-neutral-400"
        >
          Hello, I am
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          Franco Zeta
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-10"
        >
          <p className="text-lg md:text-xl text-neutral-400 mx-auto max-w-2xl">
            Software Developer & Systems Engineer & Designer
          </p>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center w-full"
        >
          <Link href="/about">
            <Button className="group flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 rounded-full mx-auto">
              <div className="relative w-7 h-7 rounded-full overflow-hidden">
                <Image
                  src="https://avatars.githubusercontent.com/u/124936792?v=4"
                  alt="Franco Zeta"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-sm">About me</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <div className="w-5 h-8 border border-neutral-500 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-1.5 bg-white rounded-full mt-1.5"
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
