"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const handleReset = () => {
    if (reset) {
      reset()
    } else {
      // Fallback: reload the page
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Crown className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-8">We're having trouble loading the Osmanian network.</p>
        <Button
          onClick={handleReset}
          className="bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-700 hover:to-blue-700 text-white"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
