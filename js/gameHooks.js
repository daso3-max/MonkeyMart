/**
 * Game Hooks - Runtime modification system
 * Applies God Mode and Auto Play effects
 */

const gameHooks = {
  // Hook into game initialization
  initGameMods() {
    this.hookCollisionDetection();
    this.hookPlayerDeath();
    this.hookAutoPlay();
  },

  hookCollisionDetection() {
    // Bypass collisions in God Mode or Auto Play
    window.originalCheckCollision = window.originalCheckCollision || function() {
      return false;
    };

    window.checkCollision = function(...args) {
      if (modMenu.state.godModeActive || modMenu.state.autoPlayActive) {
        return false; // No collision when god mode/auto play is active
      }
      return window.originalCheckCollision.apply(this, args);
    };
  },

  hookPlayerDeath() {
    // Prevent player death when God Mode is active
    window.originalOnDeath = window.originalOnDeath || function() {
      return true;
    };

    // Override death detection
    window.checkDeath = function(...args) {
      if (modMenu.state.godModeActive) {
        console.log('[GOD MODE] Death prevented!');
        return false; // Prevent death
      }
      return window.originalOnDeath.apply(this, args);
    };

    // Continuously ensure player stays alive in god mode
    window.antiDeathLoop = setInterval(() => {
      if (modMenu.state.godModeActive && typeof window.playerHealth !== 'undefined') {
        window.playerHealth = Infinity;
        window.health = Infinity;
        window.isDead = false;
        window.canDie = false;
      }
    }, 100);
  },

  hookAutoPlay() {
    // Auto Play hook for perfect jumping and dodging
    window.autoPlayPerfectJump = () => {
      if (modMenu.state.autoPlayActive) {
        window.simulateJump = true;
        window.playerHealth = Infinity;
        window.health = Infinity;
        window.playerInvincible = true;
      }
    };
  },

  // Main game loop integration
  integrateGameLoop() {
    const updateGameState = () => {
      // God Mode: Keep player alive
      if (modMenu.state.godModeActive) {
        window.playerHealth = Infinity;
        window.health = Infinity;
        window.playerInvincible = true;
        window.canDie = false;
        window.isDead = false;
      }

      // Auto Play: Perfect gameplay
      if (modMenu.state.autoPlayActive) {
        window.playerHealth = Infinity;
        window.health = Infinity;
        window.playerInvincible = true;
        window.remainingJumps = Infinity;
        window.dodgeActive = true;
        window.canDie = false;
        window.isDead = false;
        window.perfectTiming = (window.perfectTiming || 0) + 1;
      }
    };

    // Request animation frame for continuous updates
    const gameLoop = () => {
      updateGameState();
      requestAnimationFrame(gameLoop);
    };

    // Start game loop after a small delay to ensure game is loaded
    setTimeout(() => {
      gameLoop();
    }, 1000);
  }
};

// Wait for game to be fully loaded, then integrate mods
window.addEventListener('load', () => {
  setTimeout(() => {
    gameHooks.initGameMods();
    gameHooks.integrateGameLoop();
  }, 3000);
});
