import axios from 'axios'
import type { ApiResponse } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Fetch portfolio data from the API
export async function fetchPortfolio(): Promise<ApiResponse> {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/api/stocks`)
    return response.data
}


