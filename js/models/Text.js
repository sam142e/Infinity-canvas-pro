// ===========================================
// INFINITY CANVAS PRO - TEXT MODEL
// ===========================================

class Text extends Shape {
    constructor(id, x, y, text = 'Text', fontSize = CONSTANTS.DEFAULT_FONT_SIZE) {
        super(id, SHAPE_TYPES.TEXT, x, y, 100, 30);
        this.text = text;
        this.fontSize = fontSize;
        this.fontFamily = CONSTANTS.DEFAULT_FONT_FAMILY || 'inherit';
        this.fontWeight = 'normal';
        this.fontStyle = 'normal';
        this.textAlign = 'left';
        this.textColor = '#000';
        this.backgroundColor = 'transparent';
        this.fillColor = 'transparent';
    }
    
    // Set text
    setText(text) {
        this.text = text;
        this.updatedAt = Date.now();
    }
    
    // Set font size
    setFontSize(size) {
        this.fontSize = MathUtils.clamp(size, CONSTANTS.MIN_FONT_SIZE, CONSTANTS.MAX_FONT_SIZE);
        this.updatedAt = Date.now();
    }
    
    // Set font family
    setFontFamily(family) {
        this.fontFamily = family;
        this.updatedAt = Date.now();
    }
    
    toJSON() {
        return {
            ...super.toJSON(),
            text: this.text,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            fontWeight: this.fontWeight,
            fontStyle: this.fontStyle,
            textAlign: this.textAlign,
            textColor: this.textColor,
            backgroundColor: this.backgroundColor,
        };
    }
    
    clone() {
        const cloned = new Text(this.id, this.x, this.y, this.text, this.fontSize);
        Object.assign(cloned, this);
        cloned.id = 'text_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        return cloned;
    }
}
