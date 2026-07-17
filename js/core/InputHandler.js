// ===========================================
// INFINITY CANVAS PRO - INPUT HANDLER
// ===========================================

class InputHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.isMouseDown = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.isDragging = false;
        this.dragThreshold = 5;
        this.touches = [];
        this.listeners = {};
    }
    
    // Initialize event listeners
    init() {
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
        this.canvas.addEventListener('contextmenu', (e) => this.handleContextMenu(e));
        
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        this.canvas.addEventListener('touchcancel', (e) => this.handleTouchCancel(e));
    }
    
    // Mouse down
    handleMouseDown(event) {
        const pos = EventUtils.getMousePos(event, this.canvas);
        this.startX = pos.x;
        this.startY = pos.y;
        this.currentX = pos.x;
        this.currentY = pos.y;
        this.isMouseDown = true;
        this.isDragging = false;
        this.emit('mousedown', { x: pos.x, y: pos.y, button: event.button });
    }
    
    // Mouse move
    handleMouseMove(event) {
        const pos = EventUtils.getMousePos(event, this.canvas);
        this.lastX = this.currentX;
        this.lastY = this.currentY;
        this.currentX = pos.x;
        this.currentY = pos.y;
        
        if (this.isMouseDown) {
            const distance = MathUtils.distance(this.startX, this.startY, pos.x, pos.y);
            if (distance > this.dragThreshold) {
                this.isDragging = true;
            }
        }
        
        this.emit('mousemove', {
            x: pos.x,
            y: pos.y,
            dx: pos.x - this.lastX,
            dy: pos.y - this.lastY,
            isDragging: this.isDragging,
        });
    }
    
    // Mouse up
    handleMouseUp(event) {
        const pos = EventUtils.getMousePos(event, this.canvas);
        this.isMouseDown = false;
        this.emit('mouseup', {
            x: pos.x,
            y: pos.y,
            isDragging: this.isDragging,
        });
        this.isDragging = false;
    }
    
    // Mouse leave
    handleMouseLeave(event) {
        this.isMouseDown = false;
        this.isDragging = false;
        this.emit('mouseleave', {});
    }
    
    // Wheel zoom
    handleWheel(event) {
        EventUtils.stop(event);
        const pos = EventUtils.getMousePos(event, this.canvas);
        const delta = event.deltaY > 0 ? -1 : 1;
        this.emit('wheel', {
            x: pos.x,
            y: pos.y,
            delta: delta,
            ctrlKey: event.ctrlKey,
        });
    }
    
    // Context menu
    handleContextMenu(event) {
        EventUtils.stop(event);
        const pos = EventUtils.getMousePos(event, this.canvas);
        this.emit('contextmenu', { x: pos.x, y: pos.y });
    }
    
    // Touch start
    handleTouchStart(event) {
        this.touches = EventUtils.getAllTouchPos(event, this.canvas);
        this.emit('touchstart', { touches: this.touches });
    }
    
    // Touch move
    handleTouchMove(event) {
        const newTouches = EventUtils.getAllTouchPos(event, this.canvas);
        this.emit('touchmove', { touches: newTouches, prevTouches: this.touches });
        this.touches = newTouches;
    }
    
    // Touch end
    handleTouchEnd(event) {
        this.touches = EventUtils.getAllTouchPos(event, this.canvas);
        this.emit('touchend', { touches: this.touches });
    }
    
    // Touch cancel
    handleTouchCancel(event) {
        this.touches = [];
        this.emit('touchcancel', {});
    }
    
    // Event emitter
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    // Emit event
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
    
    // Remove listener
    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
}
