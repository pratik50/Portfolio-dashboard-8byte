import { useState, useEffect } from 'react'
import type { PortfolioResponse } from '../types'
import { fetchPortfolio } from '../services/api'

export function usePortfolio() {

    const [data, setData] = useState<PortfolioResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function loadData() {
        try {
            const response = await fetchPortfolio()
            setData(response.data)
            setError(null)
        } catch (err) {
            setError('Failed to fetch portfolio data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        
        loadData()

        // fecth data every 15 seconds
        const interval = setInterval(loadData, 15000)

        return () => clearInterval(interval)
    }, [])

    return { data, loading, error }
}