# Game Files Integration

This document explains how the game files are loaded and can be customized.

## Game Files Source

The Geometry Dash Lite game files are loaded from **jsDelivr CDN** from the `bubbls/UGS-Assets` repository:
- Source: https://github.com/bubbls/UGS-Assets/tree/main/gdlite
- CDN: https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/gdlite/

## Game Build Files

### Required Files
- `GeometryDashLite.json` - Game configuration
- `UnityLoader.js` - Unity WebGL loader engine
- `GeometryDashLite.data.unityweb` - Game data (split into 2 parts)
- `GeometryDashLite.wasm.code.unityweb` - WebAssembly code
- `GeometryDashLite.wasm.framework.unityweb` - WebAssembly framework

### Split Files
Some files are split for CDN distribution:
- `GeometryDashLite.data.unityweb.part1` (19.9 MB)
- `GeometryDashLite.data.unityweb.part2` (5.1 MB)
- `GeometryDashLite.wasm.code.unityweb.part1` (5.7 MB)
- `GeometryDashLite.wasm.framework.unityweb.part1` (88 KB)

These are automatically merged by the `merge.js` script loaded from CDN.

## Image Assets

Loading screen and UI images are also from CDN:
- `image/loading.png` - Loading screen logo
- `image/process_bar_back.png` - Progress bar background
- `image/process_bar_front.png` - Progress bar foreground

## How to Use Local Files (Optional)

If you want to host game files locally instead of using CDN:

1. **Download files** from `bubbls/UGS-Assets/gdlite/Build/`
2. **Create directories**:
   ```
   Build/
   image/
   ```
3. **Copy files**:
   - Game build files into `Build/`
   - Image files into `image/`

4. **Update `index.html`** to use local paths instead of CDN URLs

## File Structure

```
MonkeyMart/
├── index.html                    # Main page with mod menu + game loader
├── js/
│   ├── modMenu.js               # Mod menu system
│   └── gameHooks.js             # Game hooks for mods
├── Build/                        # (Optional local game files)
│   ├── GeometryDashLite.json
│   ├── UnityLoader.js
│   └── *.unityweb               # Game data files
├── image/                        # (Optional local images)
│   ├── loading.png
│   ├── process_bar_back.png
│   └── process_bar_front.png
└── GAME_FILES.md                # This file
```

## Default Configuration

**Current Setup**: Uses jsDelivr CDN for all game files

**Advantages:**
- ✅ No large files in Git repository
- ✅ Fast CDN delivery worldwide
- ✅ Automatic updates from bubbls/UGS-Assets

**File Merger Config** (in index.html):
```javascript
window.fileMergerConfig = {
    files: [
        { name: 'GeometryDashLite.data.unityweb', parts: 2 },
        { name: 'GeometryDashLite.wasm.code.unityweb', parts: 1 },
        { name: 'GeometryDashLite.wasm.framework.unityweb', parts: 1 },
    ],
    basePath: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/gdlite/Build/',
    debug: false
};
```

## Attribution

Game files sourced from: **[bubbls/UGS-Assets](https://github.com/bubbls/UGS-Assets)**

Original game: **RobTop Games - Geometry Dash Lite**
