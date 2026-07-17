// ===========================================
// INFINITY CANVAS PRO - MATH UTILITIES
// ===========================================

const MathUtils = {
    // Distance between two points
    distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    // Angle between two points (in radians)
    angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },
    
    // Convert radians to degrees
    toDegrees(radians) {
        return radians * (180 / Math.PI);
    },
    
    // Convert degrees to radians
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    },
    
    // Rotate point around origin
    rotatePoint(x, y, angle, centerX = 0, centerY = 0) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const dx = x - centerX;
        const dy = y - centerY;
        return {
            x: centerX + dx * cos - dy * sin,
            y: centerY + dx * sin + dy * cos,
        };
    },
    
    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
    
    // Linear interpolation
    lerp(a, b, t) {
        return a + (b - a) * t;
    },
    
    // Ease out cubic
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    },
    
    // Round to nearest multiple
    roundToNearest(value, multiple) {
        return Math.round(value / multiple) * multiple;
    },
    
    // Check if point is in rectangle
    pointInRect(px, py, x, y, width, height) {
        return px >= x && px <= x + width && py >= y && py <= y + height;
    },
    
    // Check if point is in circle
    pointInCircle(px, py, cx, cy, radius) {
        const dx = px - cx;
        const dy = py - cy;
        return (dx * dx + dy * dy) <= (radius * radius);
    },
};
