export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene) {
    super(scene, 10, 10, '', { color: 'black', fontSize: '36px', fontStyle: 'bold' })
    scene.add.existing(this)
    this.setOrigin(0)
    this.setScrollFactor(0, 0);
    this.setDepth(9999)
  }

  public update() {
    let score = Math.floor(this.scene.cameras.main.scrollY);
    if(score < 0) score = 0
    {
      this.setText(`${score}`)
    }
  }
}
