import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Crown className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist in our Osmanian network.</p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-700 hover:to-blue-700 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
