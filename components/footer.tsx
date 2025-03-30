import React from 'react'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-neutral-800">
    <div className="container mx-auto max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Franco Zeta. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            Twitter
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}
