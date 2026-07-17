// ===========================================
// INFINITY CANVAS PRO - PEN TOOL (DRAWING)
// ===========================================

class PenTool extends Tool {
    constructor() {
        super(TOOL_TYPES.PEN);
        this.isDrawing = false;
        this.points = [];
        this.currentPath = null;
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
        this.points = [{ x: event.x, y: event.y }];
        this.currentPath = new Path({
            points: this.points,
            strokeColor: CONSTANTS.DEFAULT_STROKE_COLOR,
            strokeWidth: 2,
        });
    }
    
    onMouseMove(event) {
        if (!this.isDrawing) return;
        
        this.points.push({
            x: event.x,
            y: event.y,
        });
        
        this.canvas.render();
    }
    
    onMouseUp(event) {
        if (!this.isDrawing) return;
        
        if (this.points.length > 1) {
            this.canvas.addShape(this.currentPath);
        }
        
        this.isDrawing = false;
        this.points = [];
        this.currentPath = null;
    }
}

// Path shape for pen tool
class Path extends Shape {
    constructor(config) {
        super(
            config.id || 'path_' + Date.now(),
            'path',
            0,
            0,
            100,
            100
        );
        this.points = config.points || [];
        this.closed = config.closed || false;
        this.updateBounds();
    }
    
    updateBounds() {
        if (this.points.length === 0) return;
        
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        this.points.forEach(point => {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
        });
        
        this.x = minX;
        this.y = minY;
        this.width = maxX - minX;
        this.height = maxY - minY;
    }
    
    contains(x, y) {
        // Check if point is close to any segment
        for (let i = 0; i < this.points.length - 1; i++) {
            if (GeometryUtils.pointOnLineSegment(
                x, y,
                this.points[i].x, this.points[i].y,
                this.points[i + 1].x, this.points[i + 1].y,
                CONSTANTS.SNAP_THRESHOLD
            )) {
                return true;
            }
        }
        return false;
    }
    
    toJSON() {
        return {
            ...super.toJSON(),
            points: this.points,
            closed: this.closed,
        };
    }
    
    clone() {
        const cloned = new Path({
            points: [...this.points],
            closed: this.closed,
        });
        Object.assign(cloned, this);
        cloned.id = 'path_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        return cloned;
    }
}
