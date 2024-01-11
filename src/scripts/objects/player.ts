export default class Player extends Phaser.Physics.Arcade.Sprite {

playerSpeed: number
cursors
isButtonPressed

  constructor(scene, x, y) {
    super(scene, x, y, 'player')
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.setCollideWorldBounds(true)
    .setBounce(0.2)
    .setScale(0.25)
    .setMaxVelocity(700)
    .setDragX(1800)
    .setAngularDrag(1800)

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
    const accelerationFactor = 2100;

    this.setAccelerationX(-accelerationFactor);
    this.setAngularAcceleration(-accelerationFactor);
  }

  private goRight()
  {
    const accelerationFactor = 2100;

    this.setAccelerationX(accelerationFactor);
    this.setAngularAcceleration(accelerationFactor)
  }

  private moveStop()
  {
    this.setAccelerationX(0)
    this.setAngularAcceleration(0)
  }

  private createButtons()
  {
    const width = this.scene.game.config.width
    const height = this.scene.game.config.height

      const leftButton = this.scene.add.sprite(100, Number(height) - 100, "LeftButton")
        .setScrollFactor(0)
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

        const rightButton = this.scene.add.sprite(230, Number(height) - 100, "RightButton")
        .setScrollFactor(0)
        .setDepth(99)
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
