// ===========================================
// INFINITY CANVAS PRO - RENDERER
// ===========================================

class Renderer {
    constructor(canvas, miniMapCanvas) {
        this.canvas = canvas;
        this.miniMapCanvas = miniMapCanvas;
        this.ctx = canvas.getContext('2d');
        this.miniMapCtx = miniMapCanvas.getContext('2d');
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.setupCanvas();
    }
    
    // Setup canvas with proper DPI scaling
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * this.devicePixelRatio;
        this.canvas.height = rect.height * this.devicePixelRatio;
        this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
        
        const miniRect = this.miniMapCanvas.getBoundingClientRect();
        this.miniMapCanvas.width = miniRect.width * this.devicePixelRatio;
        this.miniMapCanvas.height = miniRect.height * this.devicePixelRatio;
        this.miniMapCtx.scale(this.devicePixelRatio, this.devicePixelRatio);
    }
    
    // Clear canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio);
    }
    
    // Draw rectangle
    drawRectangle(shape, isSelected = false) {
        this.ctx.save();
        this.ctx.translate(shape.x + shape.width / 2, shape.y + shape.height / 2);
        this.ctx.rotate(MathUtils.toRadians(shape.rotation));
        this.ctx.translate(-(shape.width / 2), -(shape.height / 2));
        
        this.ctx.fillStyle = shape.fillColor;
        this.ctx.strokeStyle = shape.strokeColor;
        this.ctx.lineWidth = shape.strokeWidth;
        this.ctx.globalAlpha = shape.opacity;
        
        this.ctx.fillRect(0, 0, shape.width, shape.height);
        this.ctx.strokeRect(0, 0, shape.width, shape.height);
        
        if (isSelected) {
            this.ctx.strokeStyle = '#2563EB';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.strokeRect(-2, -2, shape.width + 4, shape.height + 4);
        }
        
        this.ctx.restore();
    }
    
    // Draw circle
    drawCircle(shape, isSelected = false) {
        this.ctx.save();
        this.ctx.translate(shape.x + shape.radius, shape.y + shape.radius);
        this.ctx.rotate(MathUtils.toRadians(shape.rotation));
        
        this.ctx.fillStyle = shape.fillColor;
        this.ctx.strokeStyle = shape.strokeColor;
        this.ctx.lineWidth = shape.strokeWidth;
        this.ctx.globalAlpha = shape.opacity;
        
        this.ctx.beginPath();
        this.ctx.arc(0, 0, shape.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        if (isSelected) {
            this.ctx.strokeStyle = '#2563EB';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, shape.radius + 2, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    // Draw line
    drawLine(shape, isSelected = false) {
        this.ctx.save();
        this.ctx.strokeStyle = shape.strokeColor;
        this.ctx.lineWidth = shape.strokeWidth;
        this.ctx.globalAlpha = shape.opacity;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(shape.x1, shape.y1);
        this.ctx.lineTo(shape.x2, shape.y2);
        this.ctx.stroke();
        
        if (isSelected) {
            this.ctx.strokeStyle = '#2563EB';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(shape.x1, shape.y1);
            this.ctx.lineTo(shape.x2, shape.y2);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    // Draw text
    drawText(shape, isSelected = false) {
        this.ctx.save();
        this.ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;
        this.ctx.fillStyle = shape.textColor;
        this.ctx.globalAlpha = shape.opacity;
        this.ctx.textAlign = shape.textAlign;
        this.ctx.textBaseline = 'top';
        
        this.ctx.fillText(shape.text, shape.x, shape.y, shape.width);
        
        if (isSelected) {
            this.ctx.strokeStyle = '#2563EB';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.strokeRect(shape.x - 2, shape.y - 2, shape.width + 4, shape.height + 4);
        }
        
        this.ctx.restore();
    }
    
    // Draw sticky note
    drawStickyNote(shape, isSelected = false) {
        this.ctx.save();
        this.ctx.globalAlpha = shape.opacity;
        
        const colors = STICKY_NOTE_COLORS[shape.color] || STICKY_NOTE_COLORS.yellow;
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const noteStyle = colors[theme] || colors.light;
        
        this.ctx.fillStyle = noteStyle.bg;
        this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        
        if (isSelected) {
            this.ctx.strokeStyle = '#2563EB';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
        
        this.ctx.restore();
    }
    
    // Draw shape (dispatcher)
    drawShape(shape, isSelected = false) {
        switch (shape.type) {
            case SHAPE_TYPES.RECTANGLE:
                this.drawRectangle(shape, isSelected);
                break;
            case SHAPE_TYPES.CIRCLE:
                this.drawCircle(shape, isSelected);
                break;
            case SHAPE_TYPES.LINE:
                this.drawLine(shape, isSelected);
                break;
            case SHAPE_TYPES.TEXT:
                this.drawText(shape, isSelected);
                break;
            case SHAPE_TYPES.STICKY_NOTE:
                this.drawStickyNote(shape, isSelected);
                break;
        }
    }
    
    // Render frame
    render(shapes, selectedIds, viewportX = 0, viewportY = 0, zoom = 1) {
        this.clear();
        
        this.ctx.save();
        this.ctx.translate(viewportX, viewportY);
        this.ctx.scale(zoom, zoom);
        
        // Draw shapes sorted by z-index
        const sorted = [...shapes].sort((a, b) => a.zIndex - b.zIndex);
        sorted.forEach(shape => {
            this.drawShape(shape, selectedIds.has(shape.id));
        });
        
        this.ctx.restore();
    }
    
    // Render mini map
    renderMiniMap(shapes, viewportBounds, canvasBounds) {
        this.miniMapCtx.clearRect(0, 0, this.miniMapCanvas.width / this.devicePixelRatio, this.miniMapCanvas.height / this.devicePixelRatio);
        // Mini map implementation
    }
}
