// ===========================================
// INFINITY CANVAS PRO - TEXT TOOL
// ===========================================

class TextTool extends Tool {
    constructor() {
        super(TOOL_TYPES.TEXT);
        this.currentTextEditor = null;
    }
    
    activate() {
        super.activate();
        if (this.canvas) {
            this.canvas.inputHandler.on('mousedown', (e) => this.onMouseDown(e));
        }
    }
    
    onMouseDown(event) {
        if (this.currentTextEditor) {
            this.currentTextEditor.remove();
            this.currentTextEditor = null;
        }
        
        const textShape = new Text(
            'text_' + Date.now(),
            event.x,
            event.y,
            'Type here...',
            16
        );
        
        this.canvas.addShape(textShape);
        this.createTextEditor(textShape, event.x, event.y);
    }
    
    createTextEditor(textShape, x, y) {
        const editor = document.createElement('textarea');
        editor.className = 'text-editor';
        editor.value = textShape.text;
        editor.style.left = x + 'px';
        editor.style.top = y + 'px';
        
        document.body.appendChild(editor);
        editor.focus();
        
        editor.addEventListener('blur', () => {
            textShape.setText(editor.value);
            editor.remove();
            this.currentTextEditor = null;
        });
        
        this.currentTextEditor = editor;
    }
}
