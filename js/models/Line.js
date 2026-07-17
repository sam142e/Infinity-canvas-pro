// ===========================================
// INFINITY CANVAS PRO - LINE MODEL
// ===========================================

class Line extends Shape {
    constructor(id, x1, y1, x2, y2) {
        const minX = Math.min(x1, x2);
        const minY = Math.min(y1, y2);
        const maxX = Math.max(x1, x2);
        const maxY = Math.max(y1, y2);
        super(id, SHAPE_TYPES.LINE, minX, minY, maxX - minX, maxY - minY);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    
    // Check if point is near the line
    contains(x, y) {
        return GeometryUtils.pointOnLineSegment(x, y, this.x1, this.y1, this.x2, this.y2, CONSTANTS.SNAP_THRESHOLD);
    }
    
    // Move line
    move(dx, dy) {
        super.move(dx, dy);
        this.x1 += dx;
        this.y1 += dy;
        this.x2 += dx;
        this.y2 += dy;
    }
    
    toJSON() {
        return {
            ...super.toJSON(),
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2,
        };
    }
    
    clone() {
        const cloned = new Line(this.id, this.x1, this.y1, this.x2, this.y2);
        Object.assign(cloned, this);
        cloned.id = 'line_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        return cloned;
    }
}
