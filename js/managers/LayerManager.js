// ===========================================
// INFINITY CANVAS PRO - LAYER MANAGER
// ===========================================

class LayerManager {
    constructor(canvas) {
        this.canvas = canvas;
    }
    
    // Show layers panel
    updateLayersPanel() {
        const panel = DOMUtils.getById('layers-panel');
        if (!panel) return;
        
        panel.innerHTML = '';
        
        const shapes = this.canvas.document.getShapesSorted().reverse();
        
        shapes.forEach(shape => {
            const item = DOMUtils.createElement('div', 'layer-item');
            item.textContent = `${shape.type} (${shape.id.substring(0, 5)})`;
            
            if (this.canvas.document.isSelected(shape.id)) {
                item.classList.add('selected');
            }
            
            item.addEventListener('click', () => {
                this.canvas.selectShape(shape.id);
                this.updateLayersPanel();
            });
            
            panel.appendChild(item);
        });
    }
    
    // Toggle visibility
    toggleVisibility(shapeId) {
        const shape = this.canvas.document.getShape(shapeId);
        if (shape) {
            shape.visible = !shape.visible;
            this.canvas.render();
        }
    }
    
    // Lock/unlock layer
    toggleLock(shapeId) {
        const shape = this.canvas.document.getShape(shapeId);
        if (shape) {
            shape.locked = !shape.locked;
            this.updateLayersPanel();
        }
    }
}
