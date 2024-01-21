export default class Player extends Phaser.Physics.Arcade.Sprite {

playerSpeed: number
cursors
isButtonPressed
accelerationFactor

  constructor(scene, x, y) {
    super(scene, x, y, 'player')
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.setCollideWorldBounds(true)
    .setBounce(0.2)
    .setScale(0.25)
    .setMaxVelocity(500)
    .setDragX(1800)
    .setAngularDrag(1800)
    this.accelerationFactor = 1400;
    
    this.cursors = scene.input.keyboard.createCursorKeys();

    this.isButtonPressed = {
      left: false,
      right: false
    }


    this.setCircle(this.displayWidth*2);

    this.setScale(0.25 * scene.mapScale / 4)

    this.createButtons()

  }

  public update()
  {
    this.checkControls();
    this.checkPosition();
  }

  private checkControls()
  {
    if (this.cursors.left.isDown || this.isButtonPressed.left) this.goLeft()
    else if (this.cursors.right.isDown || this.isButtonPressed.right) this.goRight()
    else this.moveStop()
  }

  private checkPosition()
  {
    if(this.y + this.displayWidth/2 < this.scene.cameras.main.scrollY)
    {
      this.scene.events.emit('GameOver');
    }
  }

  private goLeft()
  {
    this.setAccelerationX(-this.accelerationFactor);
    this.setAngularAcceleration(-this.accelerationFactor);
  }

  private goRight()
  {
    this.setAccelerationX(this.accelerationFactor);
    this.setAngularAcceleration(this.accelerationFactor)
  }

  private moveStop()
  {
    this.setAccelerationX(0)
    this.setAngularAcceleration(0)
  }

  private createButtons()
  {
    const width = Number(this.scene.game.config.width)
    const height = Number(this.scene.game.config.height)

      const leftButton = this.scene.add.sprite(width/ 50, height - height/30, "LeftButton")
        .setScrollFactor(0)
        .setOrigin(0,1)
        .setDepth(99)
        .setScale(1.25)
        .setAlpha(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.isButtonPressed.left = true;
          leftButton.setAlpha(0.7)
        })
        .on('pointerup', () => {
          this.isButtonPressed.left = false;
          leftButton.setAlpha(0.5)
        })
        .on('pointerout', () => {
          this.isButtonPressed.left = false;
          leftButton.setAlpha(0.5)
        })

        const rightButton = this.scene.add.sprite(leftButton.x + leftButton.width * 2, leftButton.y, "RightButton")
        .setScrollFactor(0)
        .setDepth(99)
        .setOrigin(0, 1)
        .setScale(1.25)
        .setAlpha(0.5)
        .setInteractive()
        .on('pointerdown', () => {
          this.isButtonPressed.right = true;
          rightButton.setAlpha(0.7)
        })
        .on('pointerup', () => {
          this.isButtonPressed.right = false;
          rightButton.setAlpha(0.7)
        })
        .on('pointerout', () => {
          this.isButtonPressed.right = false;
          rightButton.setAlpha(0.5)
        })

        this.scene.events.once('GameOver', () => {
          leftButton.destroy();
          rightButton.destroy();
        });
  }
}
