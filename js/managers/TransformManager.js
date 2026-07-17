// ===========================================
// INFINITY CANVAS PRO - TRANSFORM MANAGER
// ===========================================

class TransformManager {
    constructor(canvas) {
        this.canvas = canvas;
    }
    
    // Flip shapes
    flipShapes(direction) {
        const shapes = this.canvas.getSelectedShapes();
        
        shapes.forEach(shape => {
            if (direction === 'horizontal') {
                shape.scaleX = (shape.scaleX || 1) * -1;
            } else if (direction === 'vertical') {
                shape.scaleY = (shape.scaleY || 1) * -1;
            }
        });
        
        this.canvas.render();
    }
    
    // Rotate shapes
    rotateShapes(angle) {
        const shapes = this.canvas.getSelectedShapes();
        
        shapes.forEach(shape => {
            shape.rotate(shape.rotation + angle);
        });
        
        this.canvas.render();
    }
    
    // Scale shapes
    scaleShapes(scaleX, scaleY) {
        const shapes = this.canvas.getSelectedShapes();
        
        shapes.forEach(shape => {
            shape.resize(
                shape.width * scaleX,
                shape.height * (scaleY || scaleX)
            );
        });
        
        this.canvas.render();
    }
    
    // Group shapes
    groupShapes() {
        const shapes = this.canvas.getSelectedShapes();
        if (shapes.length < 2) return;
        
        const group = new Group(
            'group_' + Date.now(),
            shapes
        );
        
        shapes.forEach(s => this.canvas.document.removeShape(s.id));
        this.canvas.addShape(group);
    }
    
    // Ungroup shapes
    ungroupShapes() {
        const shapes = this.canvas.getSelectedShapes();
        
        shapes.forEach(shape => {
            if (shape instanceof Group) {
                this.canvas.document.removeShape(shape.id);
                shape.shapes.forEach(s => this.canvas.addShape(s));
            }
        });
        
        this.canvas.render();
    }
}

// Group shape
class Group extends Shape {
    constructor(id, shapes) {
        super(id, 'group', 0, 0, 100, 100);
        this.shapes = shapes;
        this.updateBounds();
    }
    
    updateBounds() {
        if (this.shapes.length === 0) return;
        
        const bounds = GeometryUtils.getBoundingBox(
            this.shapes.map(s => ({ x: s.x, y: s.y }))
        );
        
        this.x = bounds.x;
        this.y = bounds.y;
        this.width = bounds.width;
        this.height = bounds.height;
    }
    
    contains(x, y) {
        return this.shapes.some(s => s.contains(x, y));
    }
    
    move(dx, dy) {
        super.move(dx, dy);
        this.shapes.forEach(s => s.move(dx, dy));
    }
    
    toJSON() {
        return {
            ...super.toJSON(),
            shapes: this.shapes.map(s => s.toJSON()),
        };
    }
    
    clone() {
        const cloned = new Group(
            'group_' + Date.now(),
            this.shapes.map(s => s.clone())
        );
        Object.assign(cloned, this);
        return cloned;
    }
}
