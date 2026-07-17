// ===========================================
// INFINITY CANVAS PRO - ERASER TOOL
// ===========================================

class EraserTool extends Tool {
    constructor() {
        super(TOOL_TYPES.ERASER);
        this.isErasing = false;
        this.eraserSize = 20;
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
        this.isErasing = true;
        this.eraseAtPoint(event.x, event.y);
    }
    
    onMouseMove(event) {
        if (!this.isErasing) return;
        this.eraseAtPoint(event.x, event.y);
    }
    
    onMouseUp(event) {
        this.isErasing = false;
    }
    
    eraseAtPoint(x, y) {
        const shapes = this.canvas.document.getShapes();
        
        for (let shape of shapes) {
            const distance = MathUtils.distance(
                x, y,
                shape.x + shape.width / 2,
                shape.y + shape.height / 2
            );
            
            if (distance < this.eraserSize) {
                this.canvas.removeShape(shape.id);
            }
        }
    }
    
    setEraserSize(size) {
        this.eraserSize = MathUtils.clamp(size, 5, 100);
    }
}
