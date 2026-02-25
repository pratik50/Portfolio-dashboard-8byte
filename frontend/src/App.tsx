import { usePortfolio } from './hooks/usePortfolio'
import SummaryCard from './components/SummaryCard'

export default function App() {
  const { data, loading, error } = usePortfolio()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg animate-pulse">Loading portfolio...</p>
      </div>
    )
  }

  // if something went wrong
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-7xl px-6 py-10">

        <SummaryCard data={data} />

      </div>
    </div>
  )
}