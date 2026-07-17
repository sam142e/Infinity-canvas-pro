// ===========================================
// INFINITY CANVAS PRO - UI MANAGER
// ===========================================

class UIManager {
    constructor() {
        this.canvas = null;
        this.toolManager = null;
        this.listeners = {};
    }
    
    // Initialize UI
    init(canvas, toolManager) {
        this.canvas = canvas;
        this.toolManager = toolManager;
        this.setupToolbar();
        this.setupPropertiesPanel();
        this.setupKeyboardShortcuts();
    }
    
    // Setup toolbar
    setupToolbar() {
        const toolbar = DOMUtils.query('.toolbar');
        if (!toolbar) return;
        
        const tools = [
            { id: TOOL_TYPES.SELECT, icon: '✓', label: 'Select' },
            { id: TOOL_TYPES.RECTANGLE, icon: '▭', label: 'Rectangle' },
            { id: TOOL_TYPES.CIRCLE, icon: '●', label: 'Circle' },
            { id: TOOL_TYPES.TEXT, icon: 'T', label: 'Text' },
            { id: TOOL_TYPES.STICKY_NOTE, icon: '📝', label: 'Sticky Note' },
        ];
        
        tools.forEach(tool => {
            const btn = DOMUtils.createElement('button', 'toolbar-btn');
            btn.innerHTML = tool.icon;
            btn.title = tool.label;
            btn.onclick = () => this.selectTool(tool.id);
            toolbar.appendChild(btn);
        });
    }
    
    // Setup properties panel
    setupPropertiesPanel() {
        const panel = DOMUtils.query('.properties-panel');
        if (!panel) return;
        
        // Properties will be populated when shapes are selected
    }
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcut(e));
    }
    
    // Handle keyboard shortcuts
    handleKeyboardShortcut(event) {
        // Tool shortcuts
        if (event.key.toLowerCase() === 'v') this.selectTool(TOOL_TYPES.SELECT);
        if (event.key.toLowerCase() === 'r') this.selectTool(TOOL_TYPES.RECTANGLE);
        if (event.key.toLowerCase() === 'c') this.selectTool(TOOL_TYPES.CIRCLE);
        if (event.key.toLowerCase() === 't') this.selectTool(TOOL_TYPES.TEXT);
        if (event.key.toLowerCase() === 'n') this.selectTool(TOOL_TYPES.STICKY_NOTE);
        
        // Action shortcuts
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
            if (event.shiftKey) {
                this.canvas.redo();
            } else {
                this.canvas.undo();
            }
            event.preventDefault();
        }
        
        // Delete
        if (event.key === 'Delete' || event.key === 'Backspace') {
            const selected = this.canvas.getSelectedShapes();
            selected.forEach(shape => this.canvas.removeShape(shape.id));
            event.preventDefault();
        }
    }
    
    // Select tool
    selectTool(toolType) {
        this.toolManager.activateTool(toolType);
        this.updateToolbarUI(toolType);
    }
    
    // Update toolbar UI
    updateToolbarUI(activeTool) {
        const buttons = DOMUtils.queryAll('.toolbar-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        // Mark active tool button
    }
    
    // Update properties panel
    updatePropertiesPanel(shape) {
        const panel = DOMUtils.query('.properties-panel');
        if (!panel || !shape) return;
        
        panel.innerHTML = '';
        
        // Add common properties
        this.addPropertyInput(panel, 'X', shape.x, (val) => {
            shape.x = parseFloat(val);
            this.canvas.render();
        });
        
        this.addPropertyInput(panel, 'Y', shape.y, (val) => {
            shape.y = parseFloat(val);
            this.canvas.render();
        });
        
        // Add type-specific properties
        if (shape.type === SHAPE_TYPES.STICKY_NOTE) {
            this.addColorPicker(panel, shape);
        }
    }
    
    // Add property input
    addPropertyInput(container, label, value, onChange) {
        const row = DOMUtils.createElement('div', 'property-row');
        
        const labelEl = DOMUtils.createElement('label', 'label');
        labelEl.textContent = label;
        
        const input = DOMUtils.createElement('input', 'input-field');
        input.type = 'number';
        input.value = value;
        input.onchange = (e) => onChange(e.target.value);
        
        row.appendChild(labelEl);
        row.appendChild(input);
        container.appendChild(row);
    }
    
    // Add color picker
    addColorPicker(container, shape) {
        const row = DOMUtils.createElement('div', 'property-row');
        
        const label = DOMUtils.createElement('label', 'label');
        label.textContent = 'Color';
        
        const picker = DOMUtils.createElement('div', 'color-picker');
        
        CONSTANTS.NOTE_COLORS.forEach(color => {
            const option = DOMUtils.createElement('div', 'color-option');
            if (shape.color === color) {
                option.classList.add('selected');
            }
            option.onclick = () => {
                shape.setColor(color);
                this.canvas.render();
            };
            picker.appendChild(option);
        });
        
        row.appendChild(label);
        row.appendChild(picker);
        container.appendChild(row);
    }
    
    // Show notification
    showNotification(message, type = 'info', duration = 3000) {
        const notif = DOMUtils.createElement('div', `notification ${type}`);
        notif.innerHTML = `<div class="notification-message">${message}</div>`;
        
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.remove();
        }, duration);
    }
    
    // Event emitter
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
