// ===========================================
// INFINITY CANVAS PRO - RECTANGLE MODEL
// ===========================================

class Rectangle extends Shape {
    constructor(id, x, y, width, height) {
        super(id, SHAPE_TYPES.RECTANGLE, x, y, width, height);
        this.borderRadius = 0;
    }
    
    // Set border radius
    setBorderRadius(radius) {
        this.borderRadius = Math.max(0, radius);
        this.updatedAt = Date.now();
    }
    
    toJSON() {
        return {
            ...super.toJSON(),
            borderRadius: this.borderRadius,
        };
    }
    
    clone() {
        const cloned = new Rectangle(this.id, this.x, this.y, this.width, this.height);
        Object.assign(cloned, this);
        cloned.id = 'rect_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        return cloned;
    }
}
