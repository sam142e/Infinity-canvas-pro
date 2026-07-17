// ===========================================
// INFINITY CANVAS PRO - RECTANGLE TOOL
// ===========================================

class RectangleTool extends Tool {
    constructor() {
        super(TOOL_TYPES.RECTANGLE);
        this.isDrawing = false;
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
        this.isDrawing = true;
        this.startX = event.x;
        this.startY = event.y;
    }
    
    onMouseMove(event) {
        if (!this.isDrawing) return;
        // Visual feedback during drawing
    }
    
    onMouseUp(event) {
        if (!this.isDrawing) return;
        
        const width = Math.abs(event.x - this.startX);
        const height = Math.abs(event.y - this.startY);
        
        if (width > 10 && height > 10) {
            const rect = new Rectangle(
                'rect_' + Date.now(),
                Math.min(this.startX, event.x),
                Math.min(this.startY, event.y),
                width,
                height
            );
            this.canvas.addShape(rect);
        }
        
        this.isDrawing = false;
    }
}
