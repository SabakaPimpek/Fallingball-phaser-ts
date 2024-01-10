export default class Player extends Phaser.Physics.Arcade.Sprite {

playerSpeed: number

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


    this.setCircle(this.displayWidth*2);

    this.setScale(0.25 * scene.mapScale / 4)
  }

  public update(cursors)
  {
    this.checkControls(cursors);
    this.checkPosition();
  }

  private checkControls(cursors)
  {
    const accelerationFactor = 2100;

      if (cursors.left.isDown) {
        this.setAccelerationX(-accelerationFactor);
        this.setAngularAcceleration(-accelerationFactor)
    } else if (cursors.right.isDown) {
        this.setAccelerationX(accelerationFactor);
        this.setAngularAcceleration(accelerationFactor)
    }
    else
    {
      this.setAccelerationX(0)
      this.setAngularAcceleration(0)
    }

    console.log(this.width, this.height);
  }

  private checkPosition()
  {
    if(this.y < this.scene.cameras.main.scrollY)
    {
      this.scene.events.emit('GameOver');
    }
  }
}
