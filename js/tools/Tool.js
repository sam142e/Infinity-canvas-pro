// ===========================================
// INFINITY CANVAS PRO - BASE TOOL
// ===========================================

class Tool {
    constructor(toolType) {
        this.toolType = toolType;
        this.canvas = null;
        this.isActive = false;
    }
    
    // Set canvas reference
    setCanvas(canvas) {
        this.canvas = canvas;
    }
    
    // Activate tool
    activate() {
        this.isActive = true;
    }
    
    // Deactivate tool
    deactivate() {
        this.isActive = false;
    }
    
    // Handle keyboard event (override in subclass)
    handleKeyboardEvent(event) {}
    
    // Handle mouse event (override in subclass)
    handleMouseEvent(event) {}
    
    // Get tool info
    getInfo() {
        return {
            type: this.toolType,
            name: this.toolType.charAt(0).toUpperCase() + this.toolType.slice(1),
        };
    }
}
