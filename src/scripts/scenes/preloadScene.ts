export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('player', 'assets/img/player.png')
    this.load.image('background', 'assets/img/sky.png')
    this.load.image('tile', 'assets/img/tile.png')
    this.load.image('LeftButton', 'assets/img/LeftButton.png')
    this.load.image('RightButton', 'assets/img/RightButton.png')
    this.load.image('PlayButton', 'assets/img/PlayButton.png')
    this.load.image('MenuBackground', 'assets/img/MenuBackground.png')

    this.load.spritesheet('spritesheet', 'assets/img/spritesheet.png',
    {
        frameWidth: 21,
        frameHeight: 21,
        margin: 3,
        spacing: 2
    })
  }

  create() {
    this.scene.start('menuScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
