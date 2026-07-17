// ===========================================
// INFINITY CANVAS PRO - TOOL MANAGER
// ===========================================

class ToolManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.tools = {};
        this.activeTool = null;
        this.listeners = {};
    }
    
    // Register tool
    registerTool(toolType, tool) {
        this.tools[toolType] = tool;
        tool.setCanvas(this.canvas);
    }
    
    // Activate tool
    activateTool(toolType) {
        if (this.activeTool) {
            this.activeTool.deactivate();
        }
        
        this.activeTool = this.tools[toolType];
        if (this.activeTool) {
            this.activeTool.activate();
            this.emit('toolchanged', { toolType });
        }
    }
    
    // Get active tool
    getActiveTool() {
        return this.activeTool;
    }
    
    // Get tool by type
    getTool(toolType) {
        return this.tools[toolType];
    }
    
    // Handle keyboard event
    handleKeyboardEvent(event) {
        if (this.activeTool && this.activeTool.handleKeyboardEvent) {
            this.activeTool.handleKeyboardEvent(event);
        }
    }
    
    // Handle mouse event
    handleMouseEvent(event) {
        if (this.activeTool && this.activeTool.handleMouseEvent) {
            this.activeTool.handleMouseEvent(event);
        }
    }
    
    // Event emitter
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}
