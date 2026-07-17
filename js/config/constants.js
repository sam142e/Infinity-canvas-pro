// ===========================================
// INFINITY CANVAS PRO - CONSTANTS
// ===========================================

const CONSTANTS = {
    // Canvas
    MIN_ZOOM: 0.1,
    MAX_ZOOM: 5,
    DEFAULT_ZOOM: 1,
    ZOOM_STEP: 0.1,
    GRID_SIZE: 20,
    SNAP_THRESHOLD: 10,
    
    // History
    MAX_HISTORY_STATES: 50,
    
    // Autosave
    AUTOSAVE_INTERVAL: 5000, // 5 seconds
    STORAGE_KEY: 'infinity_canvas_pro_project',
    
    // Performance
    TARGET_FPS: 60,
    FRAME_TIME: 1000 / 60, // ~16.67ms
    
    // Object dimensions
    MIN_OBJECT_SIZE: 20,
    MAX_OBJECT_SIZE: 10000,
    DEFAULT_SHAPE_WIDTH: 120,
    DEFAULT_SHAPE_HEIGHT: 80,
    
    // Sticky Notes
    DEFAULT_NOTE_WIDTH: 200,
    DEFAULT_NOTE_HEIGHT: 200,
    NOTE_COLORS: ['yellow', 'pink', 'blue', 'green', 'purple', 'orange'],
    
    // Text
    DEFAULT_FONT_SIZE: 16,
    DEFAULT_FONT_FAMILY: 'inherit',
    MIN_FONT_SIZE: 8,
    MAX_FONT_SIZE: 72,
    
    // Stroke
    DEFAULT_STROKE_WIDTH: 2,
    DEFAULT_STROKE_COLOR: '#0F172A',
    
    // Fill
    DEFAULT_FILL_COLOR: '#FFFFFF',
    
    // MiniMap
    MINIMAP_SCALE: 0.15,
    MINIMAP_UPDATE_THROTTLE: 100,
    
    // Touch
    TOUCH_MOVE_THRESHOLD: 5,
    DOUBLE_TAP_DELAY: 300,
};

const TOOL_TYPES = {
    SELECT: 'select',
    STICKY_NOTE: 'sticky-note',
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    LINE: 'line',
    TEXT: 'text',
    PEN: 'pen',
    ERASER: 'eraser',
};

const SHAPE_TYPES = {
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    LINE: 'line',
    TEXT: 'text',
    STICKY_NOTE: 'sticky-note',
};

const KEY_CODES = {
    BACKSPACE: 'Backspace',
    DELETE: 'Delete',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    SPACE: ' ',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
};
