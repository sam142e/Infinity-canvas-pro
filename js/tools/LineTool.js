// ===========================================
// INFINITY CANVAS PRO - LINE TOOL
// ===========================================

class LineTool extends Tool {
    constructor() {
        super(TOOL_TYPES.LINE);
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;
        this.previewCtx = null;
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
        // Visual feedback - draw preview line
        this.canvas.render();
    }
    
    onMouseUp(event) {
        if (!this.isDrawing) return;
        
        const line = new Line(
            'line_' + Date.now(),
            this.startX,
            this.startY,
            event.x,
            event.y
        );
        this.canvas.addShape(line);
        this.isDrawing = false;
    }
}
