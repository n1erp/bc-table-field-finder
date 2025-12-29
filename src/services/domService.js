/**
 * Helper to create DOM elements with attributes and text content.
 * @param {string} tag - The HTML tag name.
 * @param {Object} attributes - Key-value pair of attributes.
 * @param {string} textContent - Optional text content.
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });

    if (textContent) {
        element.textContent = textContent;
    }

    return element;
}

/**
 * Clears all children from an element.
 * @param {HTMLElement} element 
 */
export function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
