import { dataTables } from '../data/bc-data.js';

/**
 * Service to handle searching and filtering of Business Central tables and fields.
 */
export class SearchService {
    constructor() {
        this.data = dataTables;
        this.cache = new Map();
    }

    /**
     * Searches for tables matching the query string.
     * Matches against ID, English Name, and French Name.
     * @param {string} query - The search term.
     * @param {number} limit - Max number of results to return.
     * @returns {Array} - Array of matching table objects.
     */
    searchTables(query, limit = 20) {
        if (!query) return [];
        
        const lowerQuery = query.toLowerCase().trim();
        
        // Simple caching for identical queries
        if (this.cache.has(lowerQuery)) {
            return this.cache.get(lowerQuery);
        }

        const results = [];
        for (const table of this.data) {
            if (results.length >= limit) break;

            // Check if ID starts with query (if query is number) or names include query
            const idMatch = table.Id.toString().startsWith(lowerQuery);
            const nameEnMatch = table.NameEn.toLowerCase().includes(lowerQuery);
            const nameFrMatch = table.NameFr && table.NameFr.toLowerCase().includes(lowerQuery);

            if (idMatch || nameEnMatch || nameFrMatch) {
                results.push(table);
            }
        }

        this.cache.set(lowerQuery, results);
        return results;
    }

    /**
     * Retrieves a specific table by its exact Name (case-insensitive).
     * @param {string} name 
     * @returns {Object|null}
     */
    getTableByName(name) {
        if (!name) return null;
        return this.data.find(t => t.NameEn.toLowerCase() === name.toLowerCase().trim()) || null;
    }
    
    /**
     * Retrieves a specific table by its ID.
     * @param {number|string} id 
     * @returns {Object|null}
     */
    getTableById(id) {
        return this.data.find(t => t.Id == id) || null;
    }
}
