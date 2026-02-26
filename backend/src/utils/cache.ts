import NodeCache from "node-cache"
import { isMarketOpen } from '../utils/marketHours'

const cache = new NodeCache()
export default cache