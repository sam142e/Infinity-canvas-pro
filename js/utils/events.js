// ===========================================
// INFINITY CANVAS PRO - EVENT UTILITIES
// ===========================================

const EventUtils = {
    // Throttle function execution
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Debounce function execution
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Get mouse position relative to element
    getMousePos(event, element) {
        const rect = element.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    },
    
    // Get touch position relative to element
    getTouchPos(event, element) {
        const rect = element.getBoundingClientRect();
        const touch = event.touches[0];
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        };
    },
    
    // Get all touch positions
    getAllTouchPos(event, element) {
        const rect = element.getBoundingClientRect();
        const touches = [];
        for (let i = 0; i < event.touches.length; i++) {
            const touch = event.touches[i];
            touches.push({
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top,
                id: touch.identifier,
            });
        }
        return touches;
    },
    
    // Detect pinch zoom distance
    getPinchDistance(touches) {
        if (touches.length < 2) return 0;
        const dx = touches[1].x - touches[0].x;
        const dy = touches[1].y - touches[0].y;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    // Check if modifier keys are pressed
    hasModifier(event) {
        return event.ctrlKey || event.metaKey || event.altKey || event.shiftKey;
    },
    
    // Prevent default and stop propagation
    stop(event) {
        event.preventDefault();
        event.stopPropagation();
    },
};
