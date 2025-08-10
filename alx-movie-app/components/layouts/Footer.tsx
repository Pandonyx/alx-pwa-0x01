import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t py-6 text-center text-sm text-gray-500">
      <p>
        © {new Date().getFullYear()} MovieApp. Built with Next.js & Tailwind.
      </p>
    </footer>
  )
}

export default Footer