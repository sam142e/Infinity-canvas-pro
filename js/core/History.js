// ===========================================
// INFINITY CANVAS PRO - HISTORY/UNDO-REDO
// ===========================================

class History {
    constructor(maxStates = CONSTANTS.MAX_HISTORY_STATES) {
        this.states = [];
        this.currentIndex = -1;
        this.maxStates = maxStates;
    }
    
    // Push a new state onto the history
    push(state) {
        // Remove any states after the current index (branching)
        this.states = this.states.slice(0, this.currentIndex + 1);
        
        // Add new state
        this.states.push(JSON.parse(JSON.stringify(state)));
        this.currentIndex++;
        
        // Limit history size
        if (this.states.length > this.maxStates) {
            this.states.shift();
            this.currentIndex--;
        }
    }
    
    // Undo to previous state
    undo() {
        if (this.canUndo()) {
            this.currentIndex--;
            return JSON.parse(JSON.stringify(this.states[this.currentIndex]));
        }
        return null;
    }
    
    // Redo to next state
    redo() {
        if (this.canRedo()) {
            this.currentIndex++;
            return JSON.parse(JSON.stringify(this.states[this.currentIndex]));
        }
        return null;
    }
    
    // Check if can undo
    canUndo() {
        return this.currentIndex > 0;
    }
    
    // Check if can redo
    canRedo() {
        return this.currentIndex < this.states.length - 1;
    }
    
    // Get current state
    getCurrentState() {
        if (this.currentIndex >= 0 && this.currentIndex < this.states.length) {
            return JSON.parse(JSON.stringify(this.states[this.currentIndex]));
        }
        return null;
    }
    
    // Clear history
    clear() {
        this.states = [];
        this.currentIndex = -1;
    }
    
    // Get history size
    getSize() {
        return this.states.length;
    }
}
