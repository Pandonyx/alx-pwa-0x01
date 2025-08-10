import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-6" role="status" aria-live="polite">
      <span className="mr-3">Loading</span>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
    </div>
  )
}

export default Loading