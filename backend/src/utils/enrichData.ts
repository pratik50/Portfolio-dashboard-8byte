import { PortfolioData, LiveStockData, EnrichedSector } from '../types/index.js'

// Static data (portfolio.json) + Live data (Yahoo) combining here
// All these calculations are done in this function (gain/loss, present value, portfolio %)
export function enrichPortfolio(
    portfolioData: PortfolioData,
    liveData: Record<string, LiveStockData>
): { enrichedSectors: EnrichedSector[], totalInvestment: number } {

    // All sectors total investment
    let totalInvestment = 0
    portfolioData.sectors.forEach(sector => {
        sector.stocks.forEach(stock => {
            totalInvestment += stock.purchasePrice * stock.qty
        })
    })

    const enrichedSectors: EnrichedSector[] = portfolioData.sectors.map(sector => {
        const enrichedStocks = sector.stocks.map(stock => {
            const live = liveData[stock.ticker]

            const investment = stock.purchasePrice * stock.qty

            // Present value — live price * qty
            const presentValue = live?.cmp ? live.cmp * stock.qty : null
            const gainLoss = presentValue ? presentValue - investment : null
            const gainLossPercent = gainLoss ? (gainLoss / investment) * 100 : null

            // Portfolio % in this sector out of total portfolio
            const portfolioPercent = (investment / totalInvestment) * 100

            return {
                ...stock,         
                investment,       
                portfolioPercent, 
                cmp: live?.cmp ?? null,     
                pe: live?.pe ?? null,       
                eps: live?.eps ?? null,     
                presentValue,      
                gainLoss,          
                gainLossPercent,   
            }
        })

        // Total investment in this sector
        const sectorInvestment = enrichedStocks.reduce((sum, s) => sum + s.investment, 0)
        const sectorPresentValue = enrichedStocks.reduce((sum, s) => sum + (s.presentValue || 0), 0)
        const sectorGainLoss = sectorPresentValue - sectorInvestment

        return {
            name: sector.name,
            stocks: enrichedStocks,
            summary: {
                totalInvestment: sectorInvestment,
                totalPresentValue: sectorPresentValue,
                totalGainLoss: sectorGainLoss,
                gainLossPercent: (sectorGainLoss / sectorInvestment) * 100,
            }
        }
    })

    return { enrichedSectors, totalInvestment }
}