import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaLinkedin, FaThreads } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-neutral-800">
    <div className="container mx-auto max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <p className="text-sm text-neutral-500">© {new Date().getFullYear()} Franco Zeta. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.github.com/francozeta" className="text-neutral-500 hover:text-white transition-colors" target='_blank'>
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="#" className="text-neutral-500 hover:text-white transition-colors" target='_blank'>
          <FaLinkedin className="w-5 h-5" />  
          </a>
          <a href="https://www.threads.net/@frxnco.zeta" className="text-neutral-500 hover:text-white transition-colors" target='_blank'>
          <FaThreads className="w-5 h-5" />
          </a>
          <a href="#" className="text-neutral-500 hover:text-white transition-colors" target='_blank'>
            <MdEmail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}
