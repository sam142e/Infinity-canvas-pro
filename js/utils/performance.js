// ===========================================
// INFINITY CANVAS PRO - PERFORMANCE UTILITIES
// ===========================================

const PerformanceUtils = {
    // Request animation frame with FPS target
    animationFrameID: null,
    lastFrameTime: 0,
    frameCount: 0,
    fps: 60,
    
    requestAnimationFrame(callback) {
        const now = performance.now();
        const deltaTime = now - this.lastFrameTime;
        const frameTime = 1000 / CONSTANTS.TARGET_FPS;
        
        if (deltaTime >= frameTime || this.frameCount === 0) {
            this.lastFrameTime = now;
            this.fps = 1000 / deltaTime;
            this.frameCount++;
            callback(deltaTime);
        }
        
        this.animationFrameID = window.requestAnimationFrame(() => {
            this.requestAnimationFrame(callback);
        });
    },
    
    cancelAnimationFrame() {
        if (this.animationFrameID) {
            window.cancelAnimationFrame(this.animationFrameID);
            this.animationFrameID = null;
        }
    },
    
    // Measure performance
    measure(label, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${label}: ${(end - start).toFixed(2)}ms`);
        return result;
    },
    
    // Batch DOM updates
    batchUpdates(updates) {
        requestAnimationFrame(() => {
            updates.forEach(update => update());
        });
    },
    
    // Defer function execution
    defer(fn, delay = 0) {
        return setTimeout(fn, delay);
    },
    
    // Create performance observer
    observePerformance(callback) {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            callback(entries);
        });
        return observer;
    },
};
