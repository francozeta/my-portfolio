import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="text-lg md:text-xl mb-2 text-zinc-300">Hello, I am</p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">Franco Zeta</h1>
        <p className="text-lg md:text-xl text-zinc-300 mb-10 mx-auto max-w-2xl">
          Software Developer & Systems Engineer & Designer
        </p>

        <Button className="group flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-full mx-auto transition-all duration-300 cursor-pointer">
          <div className="relative w-7 h-7 rounded-full overflow-hidden">
            <Image
              src="https://avatars.githubusercontent.com/u/124936792?v=4"
              alt="Franco Zeta"
              fill  
              className="object-cover"
            />
          </div>
          <span className="font-medium text-sm">About me</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  )
}

