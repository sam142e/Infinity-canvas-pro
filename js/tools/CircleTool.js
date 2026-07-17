// ===========================================
// INFINITY CANVAS PRO - CIRCLE TOOL
// ===========================================

class CircleTool extends Tool {
    constructor() {
        super(TOOL_TYPES.CIRCLE);
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
        
        const radius = Math.max(
            Math.abs(event.x - this.startX),
            Math.abs(event.y - this.startY)
        );
        
        if (radius > 5) {
            const circle = new Circle(
                'circle_' + Date.now(),
                this.startX,
                this.startY,
                radius
            );
            this.canvas.addShape(circle);
        }
        
        this.isDrawing = false;
    }
}
