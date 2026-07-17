// ===========================================
// INFINITY CANVAS PRO - COPY-PASTE MANAGER
// ===========================================

class ClipboardManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.clipboard = null;
    }
    
    // Copy selected shapes
    copy() {
        const shapes = this.canvas.getSelectedShapes();
        if (shapes.length === 0) return;
        
        this.clipboard = {
            shapes: shapes.map(s => ({
                ...s.toJSON(),
                id: 'copy_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            })),
            count: shapes.length,
        };
    }
    
    // Cut selected shapes
    cut() {
        this.copy();
        const shapes = this.canvas.getSelectedShapes();
        shapes.forEach(s => this.canvas.removeShape(s.id));
    }
    
    // Paste shapes
    paste() {
        if (!this.clipboard) return;
        
        this.clipboard.shapes.forEach(shapeData => {
            // Offset pasted shapes slightly
            shapeData.x += 10;
            shapeData.y += 10;
            
            // Create shape from data (simplified)
            const shape = this.createShapeFromData(shapeData);
            if (shape) {
                this.canvas.addShape(shape);
            }
        });
    }
    
    // Create shape from JSON data
    createShapeFromData(data) {
        switch (data.type) {
            case SHAPE_TYPES.RECTANGLE:
                return new Rectangle(data.id, data.x, data.y, data.width, data.height);
            case SHAPE_TYPES.CIRCLE:
                return new Circle(data.id, data.x, data.y, data.radius);
            case SHAPE_TYPES.LINE:
                return new Line(data.id, data.x1, data.y1, data.x2, data.y2);
            case SHAPE_TYPES.TEXT:
                return new Text(data.id, data.x, data.y, data.text, data.fontSize);
            case SHAPE_TYPES.STICKY_NOTE:
                return new StickyNote(data.id, data.x, data.y, data.text, data.color);
            default:
                return null;
        }
    }
    
    // Duplicate selected shapes
    duplicate() {
        const shapes = this.canvas.getSelectedShapes();
        if (shapes.length === 0) return;
        
        const duplicates = shapes.map(s => {
            const cloned = s.clone();
            cloned.x += 20;
            cloned.y += 20;
            return cloned;
        });
        
        this.canvas.clearSelection();
        duplicates.forEach(shape => {
            this.canvas.addShape(shape);
            this.canvas.selectShape(shape.id, true);
        });
    }
}
