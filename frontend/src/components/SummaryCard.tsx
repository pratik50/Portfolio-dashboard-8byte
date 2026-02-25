import type { PortfolioResponse } from '../types'

interface Props {
    data: PortfolioResponse
}

//(sorry for this messy function)
const IST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
const day = IST.getDay()
const time = IST.getHours() * 100 + IST.getMinutes()
const isMarketOpen = day !== 0 && day !== 6 && time >= 915 && time <= 1530

export default function SummaryCard({ data }: Props) {
    
    const totalPresentValue = data.sectors.reduce(
        (sum, sector) => sum + sector.summary.totalPresentValue, 0
    )

    const totalGainLoss = totalPresentValue - data.totalInvestment
    const totalGainLossPercent = (totalGainLoss / data.totalInvestment) * 100

    // if gain (green) or loss (red)
    const isProfit = totalGainLoss >= 0

    const lastUpdated = new Date(data.lastUpdated).toLocaleTimeString()

    return (
        <div className="bg-white rounded-2xl shadow p-6 mb-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">📊 Portfolio Dashboard</h1>
                <div className="flex items-center gap-3">
                    {isMarketOpen ? (
                        <span className="flex items-center gap-1 text-green-500 text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Market Open
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-red-500 text-sm">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            Market Closed
                        </span>
                    )}
                    <span className="text-sm text-gray-400">Last updated: {lastUpdated}</span>
                </div>
            </div>

            {/* summary cards */}
            <div className="grid grid-cols-3 gap-4">

                {/*Total Investment*/}
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Total Investment</p>
                    <p className="text-xl font-bold text-gray-800">
                        ₹{data.totalInvestment.toLocaleString('en-IN')}
                    </p>
                </div>

                {/*Present Value*/}
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Present Value</p>
                    <p className="text-xl font-bold text-gray-800">
                        ₹{totalPresentValue.toLocaleString('en-IN')}
                    </p>
                </div>

                {/* Gain/Loss*/}
                <div className={`rounded-xl p-4 ${isProfit ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-sm text-gray-500 mb-1">Total Gain/Loss</p>
                    <p className={`text-xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                        {isProfit ? '+' : ''}₹{totalGainLoss.toLocaleString('en-IN')}
                    </p>
                    <p className={`text-sm ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                        {isProfit ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
                    </p>
                </div>
            </div>
        </div>
    )
}