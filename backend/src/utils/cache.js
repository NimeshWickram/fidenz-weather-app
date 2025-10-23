const NodeCache = require('node-cache');

// Create a cache instance with 5 minute TTL (in seconds)
const cache = new NodeCache({ stdTTL: 300 });

module.exports = cache;