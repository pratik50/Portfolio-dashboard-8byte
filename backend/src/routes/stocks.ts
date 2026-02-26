import express, { Request, Response } from 'express'
import cache from '../utils/cache'
import portfolioData, { getAllTickers } from '../utils/portfolio'
import { fetchLiveData } from '../utils/yahooFetch'
import { enrichPortfolio } from '../utils/enrichData'
import { isMarketOpen } from '../utils/marketHours'

const router = express.Router()

// GET /api/stocks
router.get('/', async (req: Request, res: Response) => {
    try {

        // Cache for 30s 
        const cachedData = cache.get('portfolioData')
        if (cachedData) {
            return res.json({ success: true, data: cachedData, fromCache: true })
        }

        // Cache miss
        const tickers = getAllTickers()
        console.log(tickers)
        const liveData = await fetchLiveData(tickers)

        // Static + Live data combine and calculate
        const result = enrichPortfolio(portfolioData, liveData)
        const enrichedSectors = result.enrichedSectors
        const totalInvestment = result.totalInvestment

        const responseData = {
            sectors: enrichedSectors,
            totalInvestment,
            lastUpdated: new Date().toISOString(), 
        }

        // Response cache store for 5 seconds if market is open else 5 minutes
        const TTL = isMarketOpen() ? 5 : 300
        cache.set('portfolioData', responseData, TTL)

        res.json({ success: true, data: responseData, fromCache: false })

    } catch (error) {
        const err = error as Error
        console.error('Error:', err.message)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch portfolio data',
            message: err.message
        })
    }
})

export default router