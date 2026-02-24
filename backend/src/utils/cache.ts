import NodeCache from "node-cache"

// Data restore in 30 seconds after every request
const cache = new NodeCache({ stdTTL: 30 })

export default cache