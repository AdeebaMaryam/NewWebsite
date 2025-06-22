export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <p className="text-gray-600">Loading OUAlumniHub...</p>
      </div>
    </div>
  )
}
