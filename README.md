# Geometry Dash Lite - Modded Edition

A feature-rich mod menu for Geometry Dash Lite with cheat codes and developer tools.

## Features

### Power-Ups
- Grant All Power-Ups
- Max Power-Up Duration

### Player Abilities
- Unlimited Jumps
- Speed Boost (2x multiplier)
- God Mode (Invincibility)

### Gameplay Modifiers
- No Clip (Pass through walls)
- Freeze Time
- Skip Level
- Unlock All Levels

### Currency & Resources
- Add 1000 Gold
- Add 10000 Gold
- Max Out Currency (999,999,999)

### Developer Tools
- Toggle Console
- Show Game Statistics
- Dump Game State (exports as JSON)

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `Ctrl+Shift+G` | Toggle God Mode |
| `Ctrl+Shift+S` | Toggle Speed Boost |
| `Ctrl+Shift+J` | Toggle Unlimited Jumps |
| `Ctrl+Shift+L` | Skip Level |
| `Ctrl+Shift+U` | Unlock All Levels |
| `Ctrl+Shift+M` | Max Currency |
| `Ctrl+Shift+C` | Toggle Console |
| `Ctrl+Shift+D` | Dump Game State |

## Usage

### Via GUI
Click the buttons in the mod menu on the top-right corner of the screen.

### Via Console
Open browser console (F12) and use commands:

```javascript
// Power-ups
modMenu.grantAllPowerUps();
modMenu.maxPowerUps();

// Abilities
modMenu.godMode();
modMenu.speedBoost();
modMenu.unlimitedJumps();

// Gameplay
modMenu.skipLevel();
modMenu.unlockAllLevels();
modMenu.noClip();
modMenu.freezeTime();

// Currency
modMenu.addCurrency(5000);
modMenu.maxCurrency();

// Developer Tools
modMenu.showStats();
modMenu.dumpGameState();
modMenu.showConsole();
```

## Project Structure

```
.
├── index.html          # Main game file with mod menu UI
├── js/
│   ├── modMenu.js      # Core mod menu system
│   └── gameHooks.js    # Game function hooking system
├── Build/              # Unity game builds (game files)
├── image/              # Game assets (loaded via CDN)
├── StreamingAssets/    # Additional game assets
└── README.md           # This file
```

## Game Build Files

The game runs using Unity WebGL build files loaded from CDN:
- `GeometryDashLite.data.unityweb`
- `GeometryDashLite.wasm.code.unityweb`
- `GeometryDashLite.wasm.framework.unityweb`
- `GeometryDashLite.json` (Configuration)
- `UnityLoader.js` (Unity game engine)

## License

Open source - Non-commercial use only.

## Credits

Modded by: daso3-max
Original Game: RobTop Games
Source: Open Source Project
