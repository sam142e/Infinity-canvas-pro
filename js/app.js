// ===========================================
// INFINITY CANVAS PRO - APPLICATION
// ===========================================

class InfinityCanvasPro {
    constructor() {
        this.canvas = null;
        this.toolManager = null;
        this.uiManager = null;
        this.currentProject = null;
        this.autoSaveInterval = null;
    }
    
    // Initialize application
    async init() {
        // Get canvas elements
        const canvasElement = DOMUtils.getById('canvas');
        const miniMapCanvasElement = DOMUtils.getById('minimap');
        
        if (!canvasElement) {
            console.error('Canvas element not found');
            return;
        }
        
        // Initialize canvas
        this.canvas = new Canvas(canvasElement, miniMapCanvasElement);
        
        // Initialize tool manager
        this.toolManager = new ToolManager(this.canvas);
        this.setupTools();
        this.toolManager.activateTool(TOOL_TYPES.SELECT);
        
        // Initialize UI manager
        this.uiManager = new UIManager();
        this.uiManager.init(this.canvas, this.toolManager);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup autosave
        this.setupAutoSave();
        
        // Initial render
        this.canvas.render();
        
        // Load saved project if exists
        const savedProject = StorageManager.loadProject('autosave');
        if (savedProject) {
            this.loadProject(savedProject);
        }
    }
    
    // Setup tools
    setupTools() {
        this.toolManager.registerTool(TOOL_TYPES.SELECT, new SelectionTool());
        this.toolManager.registerTool(TOOL_TYPES.RECTANGLE, new RectangleTool());
        this.toolManager.registerTool(TOOL_TYPES.CIRCLE, new CircleTool());
        this.toolManager.registerTool(TOOL_TYPES.TEXT, new TextTool());
        this.toolManager.registerTool(TOOL_TYPES.STICKY_NOTE, new StickyNoteTool());
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Theme toggle
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey) {
                this.toggleTheme();
            }
        });
        
        // Canvas events
        this.canvas.on('shapeadded', (shape) => {
            this.uiManager.showNotification(`${shape.type} created`);
        });
    }
    
    // Setup autosave
    setupAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            const state = this.canvas.document.getState();
            StorageManager.saveProject('autosave', state);
            this.updateSaveIndicator();
        }, CONSTANTS.AUTOSAVE_INTERVAL);
    }
    
    // Toggle theme
    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        this.canvas.render();
    }
    
    // Update save indicator
    updateSaveIndicator() {
        const indicator = DOMUtils.query('.save-indicator');
        if (indicator) {
            indicator.textContent = 'Saved';
            setTimeout(() => {
                indicator.textContent = '';
            }, 2000);
        }
    }
    
    // Save project
    saveProject(projectName) {
        const state = this.canvas.document.getState();
        const saved = StorageManager.saveProject(projectName, state);
        if (saved) {
            this.currentProject = projectName;
            this.uiManager.showNotification(`Project "${projectName}" saved`, 'success');
            return true;
        } else {
            this.uiManager.showNotification('Failed to save project', 'error');
            return false;
        }
    }
    
    // Load project
    loadProject(state) {
        try {
            // Restore document state
            this.canvas.document.name = state.name;
            this.canvas.document.zIndexCounter = state.zIndexCounter;
            this.canvas.render();
            this.uiManager.showNotification('Project loaded', 'success');
        } catch (e) {
            console.error('Failed to load project:', e);
            this.uiManager.showNotification('Failed to load project', 'error');
        }
    }
    
    // Export project
    exportProject() {
        const state = this.canvas.document.getState();
        StorageManager.exportProject(this.currentProject || 'infinity-canvas-project', state);
    }
    
    // Clear canvas
    clearCanvas() {
        if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
            this.canvas.document.clear();
            this.canvas.render();
            this.uiManager.showNotification('Canvas cleared');
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new InfinityCanvasPro();
        app.init();
        window.app = app; // Make available globally for debugging
    });
} else {
    const app = new InfinityCanvasPro();
    app.init();
    window.app = app;
}
