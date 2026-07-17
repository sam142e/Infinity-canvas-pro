# Infinity Canvas Pro - Technical Architecture

## 1. Technology Stack

```
Frontend:
├── HTML5 + CSS3
├── Vanilla JavaScript (ES2023)
├── Canvas API (rendering)
├── LocalStorage + IndexedDB (persistence)
└── No frameworks
```

## 2. Architecture Pattern

MVC + Observer Pattern + Module Pattern

## 3. Folder Structure

```
infinity-canvas-pro/
├── index.html
├── css/
│   ├── main.css
│   ├── themes.css
│   ├── ui-components.css
│   ├── canvas.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── config/
│   │   ├── constants.js
│   │   ├── colors.js
│   │   └── shortcuts.js
│   ├── core/
│   │   ├── Canvas.js
│   │   ├── Renderer.js
│   │   ├── InputHandler.js
│   │   └── History.js
│   ├── models/
│   │   ├── Document.js
│   │   ├── Shape.js
│   │   ├── StickyNote.js
│   │   ├── Rectangle.js
│   │   ├── Circle.js
│   │   ├── Line.js
│   │   ├── Text.js
│   │   └── Image.js
│   ├── tools/
│   │   ├── ToolManager.js
│   │   ├── StickyNoteTool.js
│   │   ├── ShapeTool.js
│   │   ├── LineTool.js
│   │   ├── TextTool.js
│   │   ├── SelectionTool.js
│   │   └── EraserTool.js
│   ├── ui/
│   │   ├── ToolbarManager.js
│   │   ├── SidebarManager.js
│   │   ├── ThemeManager.js
│   │   └── NotificationManager.js
│   ├── storage/
│   │   ├── StorageManager.js
│   │   ├── LocalStorageAdapter.js
│   │   └── IndexedDBAdapter.js
│   ├── utils/
│   │   ├── math.js
│   │   ├── geometry.js
│   │   ├── dom.js
│   │   ├── events.js
│   │   └── performance.js
│   └── plugins/
├── assets/
│   ├── icons/
│   ├── fonts/
│   └── cursors/
├── README.md
└── package.json
```

## 4. Core Modules

### Canvas Engine
- Infinite coordinate system
- Pan/zoom with smooth interpolation
- Viewport culling
- Virtual rendering

### Renderer
- 2D Canvas context management
- Dirty rectangle tracking
- Batch rendering
- Layer composition

### Input Handler
- Mouse events (click, drag, scroll, wheel)
- Touch events (tap, drag, pinch-zoom)
- Keyboard events
- Event delegation

### History Manager
- Undo/Redo stack
- State snapshots
- Memory-efficient storage

## 5. Data Flow

```
User Input → InputHandler → ToolManager → Document.updateObject()
  ↓
History.push(snapshot)
  ↓
Renderer.scheduleRedraw()
  ↓
Canvas draws on next RAF
  ↓
StorageManager.autosave()
```

## 6. Performance Strategy

- Target 60 FPS via RequestAnimationFrame
- Dirty rectangle tracking
- Object culling outside viewport
- Batch operations
- Lazy initialization

## 7. Storage Strategy

- LocalStorage for small projects (<5MB)
- IndexedDB for large projects
- Automatic versioning
- Auto-recovery on crash
