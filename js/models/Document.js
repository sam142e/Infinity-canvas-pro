// ===========================================
// INFINITY CANVAS PRO - DOCUMENT MODEL
// ===========================================

class Document {
    constructor(id, name = 'Untitled') {
        this.id = id;
        this.name = name;
        this.shapes = [];
        this.selectedIds = new Set();
        this.zIndexCounter = 0;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
    
    // Add shape to document
    addShape(shape) {
        shape.zIndex = this.zIndexCounter++;
        this.shapes.push(shape);
        this.updatedAt = Date.now();
        return shape;
    }
    
    // Remove shape from document
    removeShape(shapeId) {
        const index = this.shapes.findIndex(s => s.id === shapeId);
        if (index !== -1) {
            this.shapes.splice(index, 1);
            this.selectedIds.delete(shapeId);
            this.updatedAt = Date.now();
            return true;
        }
        return false;
    }
    
    // Get shape by ID
    getShape(shapeId) {
        return this.shapes.find(s => s.id === shapeId);
    }
    
    // Get all shapes
    getShapes() {
        return [...this.shapes];
    }
    
    // Get shapes sorted by z-index
    getShapesSorted() {
        return [...this.shapes].sort((a, b) => a.zIndex - b.zIndex);
    }
    
    // Select shape
    selectShape(shapeId, multiSelect = false) {
        if (!multiSelect) {
            this.selectedIds.clear();
        }
        this.selectedIds.add(shapeId);
        this.updatedAt = Date.now();
    }
    
    // Deselect shape
    deselectShape(shapeId) {
        this.selectedIds.delete(shapeId);
        this.updatedAt = Date.now();
    }
    
    // Clear selection
    clearSelection() {
        this.selectedIds.clear();
        this.updatedAt = Date.now();
    }
    
    // Get selected shapes
    getSelectedShapes() {
        return this.shapes.filter(s => this.selectedIds.has(s.id));
    }
    
    // Check if shape is selected
    isSelected(shapeId) {
        return this.selectedIds.has(shapeId);
    }
    
    // Get selection count
    getSelectionCount() {
        return this.selectedIds.size;
    }
    
    // Bring to front
    bringToFront(shapeId) {
        const maxZ = Math.max(...this.shapes.map(s => s.zIndex), -1);
        const shape = this.getShape(shapeId);
        if (shape) {
            shape.zIndex = maxZ + 1;
            this.zIndexCounter = maxZ + 2;
            this.updatedAt = Date.now();
        }
    }
    
    // Send to back
    sendToBack(shapeId) {
        const shape = this.getShape(shapeId);
        if (shape) {
            const minZ = Math.min(...this.shapes.map(s => s.zIndex), 0);
            shape.zIndex = minZ - 1;
            this.updatedAt = Date.now();
        }
    }
    
    // Clear all shapes
    clear() {
        this.shapes = [];
        this.selectedIds.clear();
        this.zIndexCounter = 0;
        this.updatedAt = Date.now();
    }
    
    // Get document state
    getState() {
        return {
            id: this.id,
            name: this.name,
            shapes: this.shapes.map(s => s.toJSON()),
            selectedIds: Array.from(this.selectedIds),
            zIndexCounter: this.zIndexCounter,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    
    // Restore from state
    static fromState(state) {
        const doc = new Document(state.id, state.name);
        doc.zIndexCounter = state.zIndexCounter;
        doc.createdAt = state.createdAt;
        doc.updatedAt = state.updatedAt;
        
        // Restore shapes (simplified - actual implementation would need shape factory)
        state.shapes.forEach(shapeData => {
            // This would be handled by a shape factory in actual implementation
        });
        
        return doc;
    }
}
