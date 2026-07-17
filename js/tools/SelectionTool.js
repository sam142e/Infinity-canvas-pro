// ===========================================
// INFINITY CANVAS PRO - SELECTION TOOL
// ===========================================

class SelectionTool extends Tool {
    constructor() {
        super(TOOL_TYPES.SELECT);
        this.selectedShape = null;
        this.isResizing = false;
        this.isDragging = false;
        this.resizeHandle = null;
        this.startX = 0;
        this.startY = 0;
    }
    
    activate() {
        super.activate();
        if (this.canvas) {
            this.canvas.inputHandler.on('mousedown', (e) => this.onMouseDown(e));
            this.canvas.inputHandler.on('mousemove', (e) => this.onMouseMove(e));
            this.canvas.inputHandler.on('mouseup', (e) => this.onMouseUp(e));
        }
    }
    
    onMouseDown(event) {
        const shape = this.canvas.getShapeAtPoint(event.x, event.y);
        
        if (shape) {
            this.canvas.selectShape(shape.id, event.ctrlKey || event.metaKey);
            this.selectedShape = shape;
            this.isDragging = true;
            this.startX = event.x;
            this.startY = event.y;
        } else {
            this.canvas.clearSelection();
        }
    }
    
    onMouseMove(event) {
        if (this.isDragging && this.selectedShape) {
            const dx = event.x - this.startX;
            const dy = event.y - this.startY;
            
            this.selectedShape.move(dx, dy);
            this.startX = event.x;
            this.startY = event.y;
            this.canvas.render();
        }
    }
    
    onMouseUp(event) {
        this.isDragging = false;
        this.selectedShape = null;
    }
}
