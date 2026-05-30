//components/Navbar.tsx

'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Product', href: '#product' },
  { name: 'Solution', href: '#solution' },
  { name: 'Resources', href: '#resources' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About us', href: '#about' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="ml-2 font-bold text-xl text-gray-800">Enhanzers Engage</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-amber-600 transition"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="px-4 py-2 text-gray-600 hover:text-amber-600 transition"
            >
              Login
            </a>
            <a
              href="/contact"
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              Contact us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <a
                href="/login"
                className="block py-2 text-gray-600 hover:text-amber-600"
              >
                Login
              </a>
              <a
                href="/contact"
                className="block py-2 bg-amber-600 text-white text-center rounded-lg hover:bg-amber-700"
              >
                Contact us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}