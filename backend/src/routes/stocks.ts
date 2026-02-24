import express, { Request, Response } from 'express'
import cache from '../utils/cache'
import portfolioData, { getAllTickers } from '../utils/portfolio'
import { fetchLiveData } from '../utils/yahooFetch'
import { enrichPortfolio } from '../utils/enrichData'

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
        const liveData = await fetchLiveData(tickers)

        // Static + Live data combine and calculate
        const { enrichedSectors, totalInvestment } = enrichPortfolio(portfolioData, liveData)

        const responseData = {
            sectors: enrichedSectors,
            totalInvestment,
            lastUpdated: new Date().toISOString(), 
        }

        // Response cache store for 30s
        cache.set('portfolioData', responseData)

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