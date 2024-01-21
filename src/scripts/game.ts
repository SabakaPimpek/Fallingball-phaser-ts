import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import GameOverScene from './scenes/gameOverScene'
import menuScene from './scenes/menuScene'

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  // pixelArt       : true,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: innerWidth,
    height: innerHeight,
    
  },
  scene: [PreloadScene, MainScene, GameOverScene, menuScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      // debug: true
    }
  },
  fps: {
    target: 120
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
