// ===========================================
// INFINITY CANVAS PRO - KEYBOARD SHORTCUTS
// ===========================================

const SHORTCUTS = {
    // Tools
    SELECT: 'v',
    RECTANGLE: 'r',
    CIRCLE: 'c',
    LINE: 'l',
    TEXT: 't',
    STICKY_NOTE: 'n',
    
    // Actions
    UNDO: ['ctrl+z', 'cmd+z'],
    REDO: ['ctrl+shift+z', 'cmd+shift+z'],
    SAVE: ['ctrl+s', 'cmd+s'],
    DELETE: ['delete', 'backspace'],
    DUPLICATE: ['ctrl+d', 'cmd+d'],
    
    // View
    ZOOM_IN: ['+', '='],
    ZOOM_OUT: ['-'],
    ZOOM_FIT: ['ctrl+0', 'cmd+0'],
    TOGGLE_THEME: 'd',
    
    // Selection
    SELECT_ALL: ['ctrl+a', 'cmd+a'],
    DESELECT: 'escape',
};

const SHORTCUT_DESCRIPTIONS = {
    'v': 'Selection Tool',
    'r': 'Rectangle Tool',
    'c': 'Circle Tool',
    'l': 'Line Tool',
    't': 'Text Tool',
    'n': 'Sticky Note',
    'ctrl+z': 'Undo',
    'cmd+z': 'Undo (Mac)',
    'ctrl+shift+z': 'Redo',
    'cmd+shift+z': 'Redo (Mac)',
    'delete': 'Delete',
    '+': 'Zoom In',
    '-': 'Zoom Out',
    'd': 'Toggle Dark Mode',
    'escape': 'Deselect',
};

// Helper function to check if a key combination matches
function matchesShortcut(event, shortcutArray) {
    if (typeof shortcutArray === 'string') {
        shortcutArray = [shortcutArray];
    }
    
    const key = event.key.toLowerCase();
    const isCtrlOrCmd = (event.ctrlKey || event.metaKey) && !event.altKey;
    const isShift = event.shiftKey;
    
    return shortcutArray.some(shortcut => {
        if (shortcut === key && !isCtrlOrCmd && !isShift) {
            return true;
        }
        
        if (shortcut.includes('ctrl+') || shortcut.includes('cmd+')) {
            if (!isCtrlOrCmd) return false;
            const baseKey = shortcut.split('+')[1];
            if (shortcut.includes('shift+')) {
                return baseKey === key && isShift;
            }
            return baseKey === key;
        }
        
        return false;
    });
}
