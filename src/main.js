import { SearchService } from './services/searchService.js';
import { SuggestionList } from './components/SuggestionList.js';
import { TableViewer } from './components/TableViewer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Services
    const searchService = new SearchService();
    
    // Initialize Components
    const suggestionList = new SuggestionList('suggestionList', handleSelectTable);
    const tableViewer = new TableViewer('resultsContainer'); // Renamed from .texts to #resultsContainer in HTML
    
    // DOM Elements
    const searchInput = document.getElementById('tableId');
    const searchBtn = document.getElementById('searchBtn');

    // State
    let debounceTimer;

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            handleSearch(query);
        }, 300); // 300ms debounce
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(debounceTimer);
            const query = searchInput.value;
            // Try to find exact match first or just pick the first result?
            // If user hits enter, they usually expect the "best" match or to search.
            const results = searchService.searchTables(query, 1);
            if (results.length > 0) {
                handleSelectTable(results[0]);
                suggestionList.clear();
            }
        }
    });

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        const results = searchService.searchTables(query, 1);
        if (results.length > 0) {
            handleSelectTable(results[0]);
            suggestionList.clear();
        }
    });

    /**
     * Handles search logic and updates suggestions.
     * @param {string} query 
     */
    function handleSearch(query) {
        if (!query) {
            suggestionList.clear();
            return;
        }

        const results = searchService.searchTables(query, 10);
        suggestionList.render(results);
    }

    /**
     * Handles selection of a table from suggestions or search.
     * @param {Object} table 
     */
    function handleSelectTable(table) {
        if (table) {
            searchInput.value = table.NameEn; // Set input to name
            tableViewer.render(table);
        }
    }
});
