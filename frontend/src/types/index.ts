// Single stock structure static and live data
export interface Stock {
    id: number
    name: string
    purchasePrice: number
    qty: number
    ticker: string
    investment: number
    portfolioPercent: number
    cmp: number | null
    pe: number | null
    eps: number | null
    presentValue: number | null
    gainLoss: number | null
    gainLossPercent: number | null
}

// Sector summary
export interface SectorSummary {
    totalInvestment: number
    totalPresentValue: number
    totalGainLoss: number
    gainLossPercent: number
}

// Single sector structure
export interface Sector {
    name: string
    stocks: Stock[]
    summary: SectorSummary
}

// ApiResponse ka structure
export interface PortfolioResponse {
    sectors: Sector[]
    totalInvestment: number
    lastUpdated: string
}

// API response wrapper
export interface ApiResponse {
    success: boolean
    data: PortfolioResponse
    fromCache: boolean
}