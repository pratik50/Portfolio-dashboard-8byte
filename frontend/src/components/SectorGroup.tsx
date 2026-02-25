import type { Sector } from '../types'
import PortfolioTable from './PortfolioTable'
import { memo } from 'react'

interface Props {
    sector: Sector
}

const SectorGroup = memo(({ sector }: Props) => {

    const isProfit = sector.summary.totalGainLoss >= 0

    return (
        <div className="bg-white rounded-2xl shadow mb-6">

            <div className="flex justify-between items-center p-6 border-b border-gray-100">

                <h2 className="text-lg font-bold text-gray-800">
                    {sector.name}
                </h2>

                {/* Sector level totals */}
                <div className="flex gap-6 text-sm">

                    <div>
                        <p className="text-gray-400">Investment</p>
                        <p className="font-semibold text-gray-700">
                            ₹{sector.summary.totalInvestment.toLocaleString('en-IN')}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-400">Present Value</p>
                        <p className="font-semibold text-gray-700">
                            ₹{sector.summary.totalPresentValue.toLocaleString('en-IN')}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-400">Gain/Loss</p>
                        <p className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                            {isProfit ? '+' : ''}₹{sector.summary.totalGainLoss.toLocaleString('en-IN')}
                            <span className="text-xs ml-1">
                                ({isProfit ? '+' : ''}{sector.summary.gainLossPercent.toFixed(2)}%)
                            </span>
                        </p>
                    </div>

                </div>
            </div>

            <PortfolioTable stocks={sector.stocks} />
        </div>
    )
})

export default SectorGroup