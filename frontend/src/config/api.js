// API Configuration
// Use environment variable if available, otherwise default to localhost
// Remove trailing slashes to avoid double slashes in URLs
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

export default API_BASE_URL;
