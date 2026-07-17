// ===========================================
// INFINITY CANVAS PRO - BASE SHAPE MODEL
// ===========================================

class Shape {
    constructor(id, type, x, y, width, height) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = 0;
        this.opacity = 1;
        this.strokeColor = CONSTANTS.DEFAULT_STROKE_COLOR || '#000';
        this.strokeWidth = CONSTANTS.DEFAULT_STROKE_WIDTH || 2;
        this.fillColor = CONSTANTS.DEFAULT_FILL_COLOR || '#fff';
        this.zIndex = 0;
        this.locked = false;
        this.selected = false;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
    
    // Check if point is inside this shape
    contains(x, y) {
        return MathUtils.pointInRect(x, y, this.x, this.y, this.width, this.height);
    }
    
    // Get bounding box
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }
    
    // Move shape
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.updatedAt = Date.now();
    }
    
    // Resize shape
    resize(newWidth, newHeight) {
        this.width = Math.max(CONSTANTS.MIN_OBJECT_SIZE, newWidth);
        this.height = Math.max(CONSTANTS.MIN_OBJECT_SIZE, newHeight);
        this.updatedAt = Date.now();
    }
    
    // Rotate shape
    rotate(angle) {
        this.rotation = angle % 360;
        this.updatedAt = Date.now();
    }
    
    // Set opacity
    setOpacity(opacity) {
        this.opacity = MathUtils.clamp(opacity, 0, 1);
        this.updatedAt = Date.now();
    }
    
    // Clone shape
    clone() {
        const cloned = new this.constructor(this.id, this.type, this.x, this.y, this.width, this.height);
        Object.assign(cloned, this);
        cloned.id = 'shape_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        return cloned;
    }
    
    // Serialize to JSON
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            rotation: this.rotation,
            opacity: this.opacity,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            fillColor: this.fillColor,
            zIndex: this.zIndex,
            locked: this.locked,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
