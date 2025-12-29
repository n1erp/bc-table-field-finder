import { createElement, clearElement } from '../services/domService.js';

export class TableViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(tableData) {
        clearElement(this.container);

        if (!tableData) {
            this.container.appendChild(createElement('p', {}, 'No table selected or found.'));
            return;
        }

        // Header Info
        const infoHeader = createElement('h2', {}, `${tableData.Id} - ${tableData.NameEn}`);
        if (tableData.NameFr) {
            infoHeader.appendChild(createElement('span', { className: 'subtitle' }, ` (${tableData.NameFr})`));
        }
        this.container.appendChild(infoHeader);

        // Metadata List (Type, etc)
        const metaList = createElement('ul', { className: 'meta-list' });
        if (tableData.Type) metaList.appendChild(createElement('li', {}, `Type: ${tableData.Type}`));
        this.container.appendChild(metaList);

        // Fields Table
        if (tableData.Fields && tableData.Fields.length > 0) {
            const table = createElement('table', { className: 'tab-info' });
            
            // Table Header
            const thead = createElement('thead');
            const headerRow = createElement('tr');
            // Define columns explicitly for better order
            const columns = ['Id', 'NameEn', 'NameFr', 'Type', 'Length']; 
            // Or render dynamically based on first item, but explicit is safer for quality.
            // Let's check data structure again. 
            // Data has: Id, NameEn, NameFr, TableNo. (Type/Length might be missing in sample but good to support).
            // I'll stick to dynamic keys for flexibility but prioritize common ones.
            
            const firstField = tableData.Fields[0];
            const keys = Object.keys(firstField);

            keys.forEach(key => {
                headerRow.appendChild(createElement('th', {}, key));
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Table Body
            const tbody = createElement('tbody');
            tableData.Fields.forEach(field => {
                const row = createElement('tr');
                keys.forEach(key => {
                    row.appendChild(createElement('td', {}, field[key] || '-'));
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            this.container.appendChild(table);
        } else {
            this.container.appendChild(createElement('p', {}, 'No fields definition available.'));
        }
    }

    clear() {
        clearElement(this.container);
    }
}
