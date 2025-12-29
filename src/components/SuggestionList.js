import { createElement, clearElement } from '../services/domService.js';

export class SuggestionList {
    constructor(containerId, onSelectCallback) {
        this.container = document.getElementById(containerId);
        this.onSelect = onSelectCallback;
    }

    render(suggestions) {
        clearElement(this.container);

        if (suggestions.length === 0) {
            this.container.style.display = 'none';
            return;
        }

        this.container.style.display = 'block';

        suggestions.forEach(item => {
            const div = createElement('div', {
                className: 'suggestion-item',
                onClick: () => {
                    this.onSelect(item);
                    this.clear();
                }
            }, `${item.Id} - ${item.NameEn}`);
            
            this.container.appendChild(div);
        });
    }

    clear() {
        clearElement(this.container);
        this.container.style.display = 'none';
    }
}
