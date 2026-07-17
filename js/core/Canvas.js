// ===========================================
// INFINITY CANVAS PRO - CANVAS ENGINE
// ===========================================

class Canvas {
    constructor(canvasElement, miniMapCanvasElement) {
        this.canvas = canvasElement;
        this.miniMapCanvas = miniMapCanvasElement;
        this.renderer = new Renderer(this.canvas, this.miniMapCanvas);
        this.inputHandler = new InputHandler(this.canvas);
        this.document = new Document('doc_' + Date.now(), 'Untitled');
        this.history = new History();
        this.viewport = { x: 0, y: 0 };
        this.zoom = CONSTANTS.DEFAULT_ZOOM;
        this.isDraggingViewport = false;
        this.setupEventListeners();
    }
    
    // Setup event listeners
    setupEventListeners() {
        this.inputHandler.init();
        
        this.inputHandler.on('mousemove', (data) => this.handleCanvasMouseMove(data));
        this.inputHandler.on('wheel', (data) => this.handleCanvasWheel(data));
    }
    
    // Handle canvas mouse move
    handleCanvasMouseMove(data) {
        if (this.inputHandler.isMouseDown && !this.isDraggingViewport) {
            // Emit to tool manager
            this.emit('mousemove', data);
        }
    }
    
    // Handle canvas wheel
    handleCanvasWheel(data) {
        if (data.ctrlKey) {
            const oldZoom = this.zoom;
            this.zoom = MathUtils.clamp(
                this.zoom + data.delta * CONSTANTS.ZOOM_STEP,
                CONSTANTS.MIN_ZOOM,
                CONSTANTS.MAX_ZOOM
            );
            
            // Adjust viewport to zoom towards cursor
            const zoomRatio = this.zoom / oldZoom;
            this.viewport.x = data.x - (data.x - this.viewport.x) * zoomRatio;
            this.viewport.y = data.y - (data.y - this.viewport.y) * zoomRatio;
            
            this.render();
        }
    }
    
    // Add shape to canvas
    addShape(shape) {
        this.saveState();
        this.document.addShape(shape);
        this.render();
        return shape;
    }
    
    // Remove shape from canvas
    removeShape(shapeId) {
        this.saveState();
        this.document.removeShape(shapeId);
        this.render();
    }
    
    // Get shape at point
    getShapeAtPoint(x, y) {
        // Convert screen coordinates to world coordinates
        const worldX = (x - this.viewport.x) / this.zoom;
        const worldY = (y - this.viewport.y) / this.zoom;
        
        const shapes = this.document.getShapesSorted().reverse();
        for (let shape of shapes) {
            if (shape.contains(worldX, worldY)) {
                return shape;
            }
        }
        return null;
    }
    
    // Select shape
    selectShape(shapeId, multiSelect = false) {
        this.document.selectShape(shapeId, multiSelect);
        this.render();
    }
    
    // Deselect shape
    deselectShape(shapeId) {
        this.document.deselectShape(shapeId);
        this.render();
    }
    
    // Clear selection
    clearSelection() {
        this.document.clearSelection();
        this.render();
    }
    
    // Get selected shapes
    getSelectedShapes() {
        return this.document.getSelectedShapes();
    }
    
    // Render canvas
    render() {
        const shapes = this.document.getShapes();
        const selectedIds = this.document.selectedIds;
        this.renderer.render(shapes, selectedIds, this.viewport.x, this.viewport.y, this.zoom);
    }
    
    // Save state for undo
    saveState() {
        this.history.push(this.document.getState());
    }
    
    // Undo
    undo() {
        const state = this.history.undo();
        if (state) {
            this.restoreState(state);
            this.render();
        }
    }
    
    // Redo
    redo() {
        const state = this.history.redo();
        if (state) {
            this.restoreState(state);
            this.render();
        }
    }
    
    // Restore state
    restoreState(state) {
        // Simplified - full implementation would need shape factory
        this.document.name = state.name;
        this.document.zIndexCounter = state.zIndexCounter;
    }
    
    // Pan viewport
    panViewport(dx, dy) {
        this.viewport.x += dx;
        this.viewport.y += dy;
        this.render();
    }
    
    // Fit to view
    fitToView() {
        const shapes = this.document.getShapes();
        if (shapes.length === 0) {
            this.viewport = { x: 0, y: 0 };
            this.zoom = CONSTANTS.DEFAULT_ZOOM;
            return;
        }
        
        const bounds = GeometryUtils.getBoundingBox(
            shapes.map(s => ({
                x: s.x,
                y: s.y,
            }))
        );
        
        // Calculate zoom to fit
        const padding = 50;
        const canvasWidth = this.canvas.width / this.zoom;
        const canvasHeight = this.canvas.height / this.zoom;
        
        this.zoom = Math.min(
            (canvasWidth - padding) / (bounds.width + padding),
            (canvasHeight - padding) / (bounds.height + padding)
        );
        
        this.viewport.x = (canvasWidth / 2) - (bounds.x + bounds.width / 2);
        this.viewport.y = (canvasHeight / 2) - (bounds.y + bounds.height / 2);
        
        this.render();
    }
    
    // Event emitter
    listeners = {};
    
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}
