// ===========================================
// INFINITY CANVAS PRO - GEOMETRY UTILITIES
// ===========================================

const GeometryUtils = {
    // Get bounding box of multiple points
    getBoundingBox(points) {
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        points.forEach(point => {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
        });
        
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    },
    
    // Check if rectangles intersect
    rectsIntersect(rect1, rect2) {
        return !(rect1.x + rect1.width < rect2.x ||
                 rect2.x + rect2.width < rect1.x ||
                 rect1.y + rect1.height < rect2.y ||
                 rect2.y + rect2.height < rect1.y);
    },
    
    // Check if rectangle contains another
    rectContains(outer, inner) {
        return inner.x >= outer.x &&
               inner.y >= outer.y &&
               inner.x + inner.width <= outer.x + outer.width &&
               inner.y + inner.height <= outer.y + outer.height;
    },
    
    // Expand rectangle by amount
    expandRect(rect, amount) {
        return {
            x: rect.x - amount,
            y: rect.y - amount,
            width: rect.width + amount * 2,
            height: rect.height + amount * 2,
        };
    },
    
    // Get center of rectangle
    getRectCenter(rect) {
        return {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
        };
    },
    
    // Check if point is on line segment
    pointOnLineSegment(px, py, x1, y1, x2, y2, threshold = 5) {
        const distance = this.pointToLineDistance(px, py, x1, y1, x2, y2);
        return distance <= threshold && 
               px >= Math.min(x1, x2) - threshold &&
               px <= Math.max(x1, x2) + threshold &&
               py >= Math.min(y1, y2) - threshold &&
               py <= Math.max(y1, y2) + threshold;
    },
    
    // Calculate distance from point to line
    pointToLineDistance(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
        const closestX = x1 + t * dx;
        const closestY = y1 + t * dy;
        const distX = px - closestX;
        const distY = py - closestY;
        return Math.sqrt(distX * distX + distY * distY);
    },
};
