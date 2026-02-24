// Single stock structure for portfolio.json
export interface Stock {
    id: number
    name: string
    purchasePrice: number
    qty: number
    ticker: string
}

// Single sector structure 
export interface Sector {
    name: string
    stocks: Stock[]
}

// Whole portfolio.json structure
export interface PortfolioData {
    sectors: Sector[]
}

// Yahho live data return structure
export interface LiveStockData {
    cmp: number | null
    pe: number | null
    eps: number | null
}

// Static + Live combining structure for single stock
export interface EnrichedStock extends Stock {
    investment: number
    portfolioPercent: number
    cmp: number | null
    pe: number | null
    eps: number | null
    presentValue: number | null
    gainLoss: number | null
    gainLossPercent: number | null
}

// Sector level summary
export interface SectorSummary {
    totalInvestment: number
    totalPresentValue: number
    totalGainLoss: number
    gainLossPercent: number
}

// Enriched sector (stocks + summary)
export interface EnrichedSector {
    name: string
    stocks: EnrichedStock[]
    summary: SectorSummary
}

// Final API response structure
export interface PortfolioResponse {
    sectors: EnrichedSector[]
    totalInvestment: number
    lastUpdated: string
}