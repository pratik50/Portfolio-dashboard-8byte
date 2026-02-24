import YahooFinance from 'yahoo-finance2'
import { LiveStockData } from '../types/index.js'

const yahooFinance = new YahooFinance()

// Fetch one ticker data (current market price, pe, eps)
async function fetchOneTicker(ticker: string): Promise<LiveStockData> {
    try {
        const result = await yahooFinance.quote(ticker) as any

        // Fetching data from Yahoo Finance API if fails then return null
        if (!result) {
            return { cmp: null, pe: null, eps: null }
        }
        
        return {
            cmp: result.regularMarketPrice ?? null,   
            pe: result.trailingPE ?? null,            
            eps: result.epsTrailingTwelveMonths ?? null
        }
    } catch (err) {
        console.error(`Failed to fetch ${ticker}:`, err) 
        return { cmp: null, pe: null, eps: null }
    }
}

// Fetch live data for all tickers in one go (current market price, pe, eps)
export async function fetchLiveData(tickers: string[]): Promise<Record<string, LiveStockData>> {
    const results = await Promise.all(
        tickers.map(ticker => fetchOneTicker(ticker))
    )

    // Convert Array to object with ticker 
    const liveDataMap: Record<string, LiveStockData> = {}
    tickers.forEach((ticker, index) => {
        liveDataMap[ticker] = results[index]!
    })

    return liveDataMap
}