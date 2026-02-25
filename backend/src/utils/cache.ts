import NodeCache from "node-cache"
import { isMarketOpen } from '../utils/marketHours'

// 15s cache during market hours
// 5min cache during closed market hours
const TTL = isMarketOpen() ? 15 : 500

const cache = new NodeCache({ stdTTL: TTL })
export default cache