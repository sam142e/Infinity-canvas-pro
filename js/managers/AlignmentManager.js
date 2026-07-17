// ===========================================
// INFINITY CANVAS PRO - ALIGNMENT MANAGER
// ===========================================

class AlignmentManager {
    constructor(canvas) {
        this.canvas = canvas;
    }
    
    // Align selected shapes
    alignShapes(alignment) {
        const shapes = this.canvas.getSelectedShapes();
        if (shapes.length < 2) return;
        
        const bounds = shapes.map(s => ({
            shape: s,
            bounds: s.getBounds(),
        }));
        
        switch (alignment) {
            case 'left':
                this.alignLeft(bounds);
                break;
            case 'right':
                this.alignRight(bounds);
                break;
            case 'top':
                this.alignTop(bounds);
                break;
            case 'bottom':
                this.alignBottom(bounds);
                break;
            case 'center-h':
                this.alignCenterHorizontal(bounds);
                break;
            case 'center-v':
                this.alignCenterVertical(bounds);
                break;
            case 'distribute-h':
                this.distributeHorizontal(bounds);
                break;
            case 'distribute-v':
                this.distributeVertical(bounds);
                break;
        }
        
        this.canvas.render();
    }
    
    alignLeft(bounds) {
        const minX = Math.min(...bounds.map(b => b.bounds.x));
        bounds.forEach(b => {
            b.shape.x = minX;
        });
    }
    
    alignRight(bounds) {
        const maxX = Math.max(...bounds.map(b => b.bounds.x + b.bounds.width));
        bounds.forEach(b => {
            b.shape.x = maxX - b.bounds.width;
        });
    }
    
    alignTop(bounds) {
        const minY = Math.min(...bounds.map(b => b.bounds.y));
        bounds.forEach(b => {
            b.shape.y = minY;
        });
    }
    
    alignBottom(bounds) {
        const maxY = Math.max(...bounds.map(b => b.bounds.y + b.bounds.height));
        bounds.forEach(b => {
            b.shape.y = maxY - b.bounds.height;
        });
    }
    
    alignCenterHorizontal(bounds) {
        const avgX = bounds.reduce((sum, b) => sum + b.bounds.x + b.bounds.width / 2, 0) / bounds.length;
        bounds.forEach(b => {
            b.shape.x = avgX - b.bounds.width / 2;
        });
    }
    
    alignCenterVertical(bounds) {
        const avgY = bounds.reduce((sum, b) => sum + b.bounds.y + b.bounds.height / 2, 0) / bounds.length;
        bounds.forEach(b => {
            b.shape.y = avgY - b.bounds.height / 2;
        });
    }
    
    distributeHorizontal(bounds) {
        const sorted = bounds.sort((a, b) => a.bounds.x - b.bounds.x);
        const totalSpacing = (sorted[sorted.length - 1].bounds.x + sorted[sorted.length - 1].bounds.width) - sorted[0].bounds.x;
        const spacing = totalSpacing / (sorted.length - 1);
        
        sorted.forEach((b, i) => {
            b.shape.x = sorted[0].bounds.x + i * spacing - b.bounds.width / 2;
        });
    }
    
    distributeVertical(bounds) {
        const sorted = bounds.sort((a, b) => a.bounds.y - b.bounds.y);
        const totalSpacing = (sorted[sorted.length - 1].bounds.y + sorted[sorted.length - 1].bounds.height) - sorted[0].bounds.y;
        const spacing = totalSpacing / (sorted.length - 1);
        
        sorted.forEach((b, i) => {
            b.shape.y = sorted[0].bounds.y + i * spacing - b.bounds.height / 2;
        });
    }
}
