// ===========================================
// INFINITY CANVAS PRO - STICKY NOTE MODEL
// ===========================================

class StickyNote extends Shape {
    constructor(id, x, y, text = '', color = 'yellow') {
        super(id, SHAPE_TYPES.STICKY_NOTE, x, y, CONSTANTS.DEFAULT_NOTE_WIDTH, CONSTANTS.DEFAULT_NOTE_HEIGHT);
        this.text = text;
        this.color = color;
        this.fontSize = 14;
        this.fontFamily = 'inherit';
    }
    
    // Set text
    setText(text) {
        this.text = text;
        this.updatedAt = Date.now();
    }
    
    // Set color
    setColor(color) {
        if (CONSTANTS.NOTE_COLORS.includes(color)) {
            this.color = color;
            this.updatedAt = Date.now();
        }
    }
    
    toJSON() {
        return {
            ...super.toJSON(),
            text: this.text,
            color: this.color,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
        };
    }
    
    clone() {
        const cloned = new StickyNote(this.id, this.x, this.y, this.text, this.color);
        Object.assign(cloned, this);
        cloned.id = 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        return cloned;
    }
}
