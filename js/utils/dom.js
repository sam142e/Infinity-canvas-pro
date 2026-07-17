// ===========================================
// INFINITY CANVAS PRO - DOM UTILITIES
// ===========================================

const DOMUtils = {
    // Create element with class
    createElement(tag, className = '', innerHTML = '') {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (innerHTML) el.innerHTML = innerHTML;
        return el;
    },
    
    // Add multiple event listeners
    addEventListeners(element, events) {
        Object.entries(events).forEach(([eventType, handler]) => {
            element.addEventListener(eventType, handler);
        });
    },
    
    // Remove multiple event listeners
    removeEventListeners(element, events) {
        Object.entries(events).forEach(([eventType, handler]) => {
            element.removeEventListener(eventType, handler);
        });
    },
    
    // Toggle class
    toggleClass(element, className, force) {
        element.classList.toggle(className, force);
    },
    
    // Has class
    hasClass(element, className) {
        return element.classList.contains(className);
    },
    
    // Query selector shorthand
    query(selector) {
        return document.querySelector(selector);
    },
    
    // Query all shorthand
    queryAll(selector) {
        return document.querySelectorAll(selector);
    },
    
    // Get element by ID
    getById(id) {
        return document.getElementById(id);
    },
    
    // Set multiple attributes
    setAttributes(element, attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    },
    
    // Set CSS styles
    setStyles(element, styles) {
        Object.entries(styles).forEach(([key, value]) => {
            element.style[key] = value;
        });
    },
};
