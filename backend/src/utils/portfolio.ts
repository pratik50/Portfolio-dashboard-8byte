import { readFileSync } from 'fs'
import { join } from 'path'
import { PortfolioData } from '../types/index'

// Read the portfolio data from the JSON file
const portfolioData: PortfolioData = JSON.parse(
    readFileSync(join(__dirname, '../../src/data/portfolio.json'), 'utf-8')
)

// Get all tickers from the portfolio data
export function getAllTickers(): string[] {
    const tickers: string[] = []
    portfolioData.sectors.forEach(sector => {
        sector.stocks.forEach(stock => {
            tickers.push(stock.ticker)
        })
    })
    return tickers
}

export default portfolioData