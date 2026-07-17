// ===========================================
// INFINITY CANVAS PRO - STICKY NOTE TOOL
// ===========================================

class StickyNoteTool extends Tool {
    constructor() {
        super(TOOL_TYPES.STICKY_NOTE);
    }
    
    activate() {
        super.activate();
        if (this.canvas) {
            this.canvas.inputHandler.on('mousedown', (e) => this.onMouseDown(e));
        }
    }
    
    onMouseDown(event) {
        const note = new StickyNote(
            'note_' + Date.now(),
            event.x,
            event.y,
            'New note...',
            'yellow'
        );
        this.canvas.addShape(note);
    }
}
