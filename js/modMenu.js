/**
 * Geometry Dash Lite - Mod Menu System
 * Provides cheat codes and developer tools
 */

const modMenu = {
  // State tracking
  state: {
    godModeActive: false,
    unlimitedJumpsActive: false,
    speedBoostActive: false,
    noClipActive: false,
    freezeTimeActive: false,
    modsPowerUps: {}
  },

  // Update status display
  updateStatus(message) {
    const statusEl = document.getElementById('modStatus');
    if (statusEl) {
      statusEl.textContent = `Status: ${message}`;
    }
    console.log(`[MOD MENU] ${message}`);
  },

  // ===== POWER-UP FUNCTIONS =====
  grantAllPowerUps() {
    this.updateStatus('Granting all power-ups...');
    const powerUps = [
      'shield',
      'speedBoost',
      'invincibility',
      'doubleJump',
      'magneticField',
      'timeWarp',
      'fireShield',
      'iceShield'
    ];
    
    powerUps.forEach(powerUp => {
      this.state.modsPowerUps[powerUp] = 1;
    });
    
    try {
      if (window.gameInstance && window.gameInstance.Module) {
        powerUps.forEach(powerUp => {
          this.injectGameCode(`window.playerPowerUps = window.playerPowerUps || {}; window.playerPowerUps['${powerUp}'] = true;`);
        });
      }
    } catch (e) {
      console.log('Power-ups granted locally');
    }
    
    this.updateStatus('All power-ups granted! ✓');
  },

  maxPowerUps() {
    this.updateStatus('Maximizing power-up duration...');
    const maxDuration = 999999;
    this.injectGameCode(`window.powerUpDuration = ${maxDuration};`);
    this.updateStatus('Power-ups set to max duration! ✓');
  },

  // ===== PLAYER ABILITY FUNCTIONS =====
  unlimitedJumps() {
    this.state.unlimitedJumpsActive = !this.state.unlimitedJumpsActive;
    this.updateStatus(`Unlimited jumps: ${this.state.unlimitedJumpsActive ? 'ON' : 'OFF'}`);
    this.injectGameCode(`window.unlimitedJumpsEnabled = ${this.state.unlimitedJumpsActive};`);
  },

  speedBoost() {
    this.state.speedBoostActive = !this.state.speedBoostActive;
    this.updateStatus(`Speed boost: ${this.state.speedBoostActive ? 'ON' : 'OFF'}`);
    const speedMultiplier = this.state.speedBoostActive ? 2.0 : 1.0;
    this.injectGameCode(`window.playerSpeedMultiplier = ${speedMultiplier};`);
  },

  godMode() {
    this.state.godModeActive = !this.state.godModeActive;
    this.updateStatus(`God Mode: ${this.state.godModeActive ? 'ON' : 'OFF'}`);
    this.injectGameCode(`
      window.godModeEnabled = ${this.state.godModeActive};
      if (window.godModeEnabled) {
        window.playerHealth = Infinity;
        window.playerInvincible = true;
      }
    `);
  },

  // ===== GAMEPLAY FUNCTIONS =====
  noClip() {
    this.state.noClipActive = !this.state.noClipActive;
    this.updateStatus(`No Clip: ${this.state.noClipActive ? 'ON' : 'OFF'}`);
    this.injectGameCode(`window.noClipMode = ${this.state.noClipActive};`);
  },

  freezeTime() {
    this.state.freezeTimeActive = !this.state.freezeTimeActive;
    this.updateStatus(`Freeze Time: ${this.state.freezeTimeActive ? 'ON' : 'OFF'}`);
    this.injectGameCode(`window.timeFreeze = ${this.state.freezeTimeActive};`);
  },

  skipLevel() {
    this.updateStatus('Skipping to next level...');
    this.injectGameCode(`
      if (window.gameInstance) {
        window.currentLevel = (window.currentLevel || 0) + 1;
        window.levelComplete = true;
      }
    `);
    this.updateStatus('Level skipped! ✓');
  },

  unlockAllLevels() {
    this.updateStatus('Unlocking all levels...');
    this.injectGameCode(`
      window.allLevelsUnlocked = true;
      for (let i = 0; i < 100; i++) {
        window['level_' + i + '_unlocked'] = true;
      }
    `);
    this.updateStatus('All levels unlocked! ✓');
  },

  // ===== CURRENCY & RESOURCES =====
  addCurrency(amount) {
    this.updateStatus(`Adding ${amount} currency...`);
    this.injectGameCode(`window.playerCurrency = (window.playerCurrency || 0) + ${amount};`);
    this.updateStatus(`Added ${amount} currency! ✓`);
  },

  maxCurrency() {
    this.updateStatus('Maximizing currency...');
    this.injectGameCode(`window.playerCurrency = 999999999;`);
    this.updateStatus('Currency maximized! ✓');
  },

  // ===== DEVELOPER TOOLS =====
  showConsole() {
    if (!window.devConsole) {
      window.devConsole = {
        logs: [],
        visible: false
      };
    }
    
    window.devConsole.visible = !window.devConsole.visible;
    this.updateStatus(`Developer Console: ${window.devConsole.visible ? 'VISIBLE' : 'HIDDEN'}`);
    
    if (window.devConsole.visible) {
      console.log('%c=== DEVELOPER CONSOLE ENABLED ===', 'color: #00ff00; font-size: 14px; font-weight: bold;');
      console.log('%cAvailable functions:', 'color: #00ff00; font-weight: bold;');
      console.log('modMenu.grantAllPowerUps()');
      console.log('modMenu.godMode()');
      console.log('modMenu.skipLevel()');
      console.log('modMenu.unlockAllLevels()');
      console.log('modMenu.addCurrency(amount)');
      console.log('modMenu.showStats()');
      console.log('modMenu.dumpGameState()');
    }
  },

  showStats() {
    this.updateStatus('Displaying game statistics...');
    const stats = {
      godMode: this.state.godModeActive,
      unlimitedJumps: this.state.unlimitedJumpsActive,
      speedBoost: this.state.speedBoostActive,
      noClip: this.state.noClipActive,
      freezeTime: this.state.freezeTimeActive,
      activeMods: Object.keys(this.state.modsPowerUps).length
    };
    
    console.table(stats);
    console.log('%c=== GAME STATISTICS ===', 'color: #00ff00; font-size: 12px; font-weight: bold;');
    Object.keys(stats).forEach(key => {
      console.log(`${key}: ${stats[key]}`);
    });
  },

  dumpGameState() {
    this.updateStatus('Dumping game state...');
    const gameState = {
      currency: window.playerCurrency || 0,
      health: window.playerHealth || 100,
      level: window.currentLevel || 0,
      powerUps: this.state.modsPowerUps,
      activeMods: {
        godMode: this.state.godModeActive,
        speedBoost: this.state.speedBoostActive,
        unlimitedJumps: this.state.unlimitedJumpsActive,
        noClip: this.state.noClipActive,
        freezeTime: this.state.freezeTimeActive
      }
    };
    
    console.log('%c=== GAME STATE DUMP ===', 'color: #00ff00; font-size: 12px; font-weight: bold;');
    console.log(JSON.stringify(gameState, null, 2));
    console.log(gameState);
    
    // Download as JSON file
    const dataStr = JSON.stringify(gameState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `game-state-${Date.now()}.json`;
    link.click();
  },

  // ===== UTILITY FUNCTIONS =====
  injectGameCode(code) {
    try {
      const script = document.createElement('script');
      script.textContent = code;
      document.head.appendChild(script);
    } catch (e) {
      console.error('Code injection failed:', e);
    }
  },

  // Initialize keyboard shortcuts
  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey) {
        switch (e.key.toUpperCase()) {
          case 'G':
            this.godMode();
            break;
          case 'S':
            this.speedBoost();
            break;
          case 'J':
            this.unlimitedJumps();
            break;
          case 'L':
            this.skipLevel();
            break;
          case 'U':
            this.unlockAllLevels();
            break;
          case 'M':
            this.maxCurrency();
            break;
          case 'C':
            this.showConsole();
            break;
          case 'D':
            this.dumpGameState();
            break;
        }
      }
    });
    
    console.log('%c=== KEYBOARD SHORTCUTS ===', 'color: #00ff00; font-size: 12px; font-weight: bold;');
    console.log('Ctrl+Shift+G - Toggle God Mode');
    console.log('Ctrl+Shift+S - Toggle Speed Boost');
    console.log('Ctrl+Shift+J - Toggle Unlimited Jumps');
    console.log('Ctrl+Shift+L - Skip Level');
    console.log('Ctrl+Shift+U - Unlock All Levels');
    console.log('Ctrl+Shift+M - Max Currency');
    console.log('Ctrl+Shift+C - Toggle Console');
    console.log('Ctrl+Shift+D - Dump Game State');
  }
};

// Initialize on load
function initializeModMenu() {
  modMenu.updateStatus('Mod Menu Initialized');
  modMenu.initKeyboardShortcuts();
  
  console.log('%c╔═══════════════════════════════════════╗', 'color: #00ff00; font-weight: bold;');
  console.log('%c║     GEOMETRY DASH LITE - MOD MENU     ║', 'color: #00ff00; font-weight: bold;');
  console.log('%c║           Ready for Modding          ║', 'color: #00ff00; font-weight: bold;');
  console.log('%c╚═══════════════════════════════════════╝', 'color: #00ff00; font-weight: bold;');
  console.log('%cType: modMenu.showConsole() to get started', 'color: #00ff00; font-size: 11px;');
}