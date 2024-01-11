export default class menuScene extends Phaser.Scene {
    constructor() {
      super({ key: 'menuScene' })
    }
  
    preload() {
     
    }
  
    create() {

        const centerX: number = Number(this.game.config.width)/2
        const centerY: number = Number(this.game.config.height)/2

        this.add.sprite(centerX, centerY,'PlayButton')
        .setScale(2)
        .setInteractive()
        .on('pointerup', () => {this.scene.start('MainScene')})

        
        this.add.image(centerX, centerY, 'MenuBackground')
        .setDepth(-1)
        .setScrollFactor(0)
    }
  }
  