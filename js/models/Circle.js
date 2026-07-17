// ===========================================
// INFINITY CANVAS PRO - CIRCLE MODEL
// ===========================================

class Circle extends Shape {
    constructor(id, x, y, radius) {
        super(id, SHAPE_TYPES.CIRCLE, x, y, radius * 2, radius * 2);
        this.radius = radius;
    }
    
    // Set radius
    setRadius(radius) {
        this.radius = Math.max(CONSTANTS.MIN_OBJECT_SIZE / 2, radius);
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.updatedAt = Date.now();
    }
    
    // Check if point is inside circle
    contains(x, y) {
        const centerX = this.x + this.radius;
        const centerY = this.y + this.radius;
        return MathUtils.pointInCircle(x, y, centerX, centerY, this.radius);
    }
    
    toJSON() {
        return {
            ...super.toJSON(),
            radius: this.radius,
        };
    }
    
    clone() {
        const cloned = new Circle(this.id, this.x, this.y, this.radius);
        Object.assign(cloned, this);
        cloned.id = 'circle_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        return cloned;
    }
}
