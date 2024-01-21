import Player from '../objects/player'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  scoreText
  player: Phaser.Physics.Arcade.Sprite
  mapScale: number
  platformGroup: Phaser.Physics.Arcade.Group
  spriteY
  score: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'MainScene' })
  }

  init()
  {
    const width = Number(this.game.config.width);
    this.mapScale = 4;
    // this.mapScale = this.game.scale.isGameLandscape? 4 : 2;
    // this.tileGroup = this.physics.add.group;

    if(Math.floor(width / 1000) <= 0) this.mapScale = 2;
    else this.mapScale = Math.floor(width / 1000) + 3;

    // this.showGameOver();
    
  }

  create() {
    this.player = new Player(this, this.cameras.main.width / 2, 0)
    this.spriteY = this.physics.add.sprite(this.cameras.main.width/2, 0, "").setMaxVelocity(800).setAlpha(0);
    this.scoreText = new FpsText(this)

    this.add.image(0, 0, 'background').setOrigin(0, 0)
        .setDepth(-1)
        .setScrollFactor(0)
    
    // display the Phaser.VERSION
    // this.score = this.add
    //   .text(this.cameras.main.width - 15, 15, `${this.cameras.main.scrollY}m`, {
    //     color: '#000000',
    //     fontSize: '36px',
    //     fontStyle: 'bold'
    //   })
    //   .setOrigin(1, 0)
    //   .setScrollFactor(0)
    //   .setDepth(999)

    this.platformGroup = this.physics.add.group();
  
    // const generatedTile = this.

    const PlatformGap: number = this.mapScale * 50;

    const PlatformStartingNumber = Number(this.game.config.height)/ PlatformGap + 1

    console.log(this);

    for(let i = 0; i < PlatformStartingNumber; i++)
    {
      this.platformGroup.addMultiple(this.createPlatform(PlatformGap*i));
    }

    // tileGroup.add();

    this.physics.add.collider(this.player, this.platformGroup);

    const platformArray = this.platformGroup.getChildren() as Phaser.Physics.Arcade.Sprite[];

    platformArray.forEach(tile => {
      if (tile.body instanceof Phaser.Physics.Arcade.Body) {
        tile.body.setAllowGravity(false);
        tile.setImmovable(true);
      }
    });

    this.physics.world.setBounds(0, 0, this.cameras.main.width, Infinity);
    
    // this.cameras.main.roundPixels = fa;

    this.cameras.main.setScroll(0,0)
    this.cameras.main.startFollow(this.spriteY, true, 1, 1)

    this.createListeners();

  }

  update() {
    this.scoreText.update()
    this.player.update()
    this.cameraUpdate();
    this.checkCurrentPlatform();
  }

  createPlatform(xPos: number)
  {
    const screenWidth = this.cameras.main.width;

       // Szerokość ekranu
           // Szerokość kafelka
      const tileWidth = 16 * this.mapScale;

           // Ilość kafelków, jakie mieszczą się na ekranie
      const tileCount = Math.ceil(screenWidth / tileWidth);
      
      const holeStart = Phaser.Math.Between(0, tileCount-2);

      const holeEnd = holeStart + 2; 

      let group = this.physics.add.group();
     
           // Tworzenie kafelków

      for (let i = 0; i < tileCount + 1; i++) {
        if (i >= holeStart && i <= holeEnd) {
          continue; 
      }


        let tile = this.physics.add.sprite(i * tileWidth, xPos, 'tile');
        tile.texture.setFilter(Phaser.Textures.NEAREST)
        // tile.setTexture("spritesheet", 158)
        tile.setScale(this.mapScale);

        group.add(tile);
        
      }

      return group.getChildren() as Phaser.GameObjects.Sprite[];
  }

  cameraUpdate()
  {
    const ScreenHeightLimit = this.cameras.main.height * 0.65 + this.cameras.main.scrollY;
    const accelerationThreshold = 100; // Wartość, od której zaczyna się przyspieszanie
    
    // Obliczenia różnicy między pozycją gracza a pozycją, od której zaczyna się przyspieszanie
    const accelerationDelta = Math.max(this.player.y - ScreenHeightLimit, 0);
    
    // Wykorzystanie bazowej prędkości z dodatkiem przyspieszenia
    const baseVelocityY = 125;
    const acceleratedVelocityY = baseVelocityY + accelerationDelta / accelerationThreshold * (600 - baseVelocityY);
    
    // Ustawienie prędkości sprite'a
    this.spriteY.setVelocityY(acceleratedVelocityY);
  }

  checkCurrentPlatform()
  {
    const platformArray = this.platformGroup.getChildren() as Phaser.Physics.Arcade.Sprite[];

    const min = Math.min(...platformArray.map(obj => obj.y)); // find minimum value for platform

    
    if(min < this.cameras.main.scrollY - 200)
    {
      platformArray.forEach(tile => {
        if(tile.y <= min) tile.destroy();
      });

      
      const max = Math.max(...platformArray.map(obj => obj.y));

      if(max - min > this.cameras.main.height * 1.5 ) return;
      
      const newPlatform = this.createPlatform(max + this.mapScale * 50)
      
      this.platformGroup.addMultiple(newPlatform);
      
      platformArray.forEach(tile => {
        if (tile.body instanceof Phaser.Physics.Arcade.Body) {
          tile.body.setAllowGravity(false);
          tile.setImmovable(true);
        }
      });
      console.log(min, max);
    }
  }

  createListeners()
  {
    this.events.on('GameOver', this.showGameOver.bind(this)); //
  }

  showGameOver()
    {
        this.scene.pause();

        this.scene.launch('GameOverScene', { score: Math.floor(this.cameras.main.scrollY)})

        let panel = this.scene.get('GameOverScene');

        panel.events.on('clickMenu', this.handleGoMenu, this);
        panel.events.on('clickTryAgain', this.handleTryAgain, this);

        this.events.emit('gameOver');
    }

    closeGameOver()
    {
        this.scene.stop('GameOverScene');
    }

    handleGoMenu()
    {
        this.closeGameOver();
        this.goMenu();
    }

    handleTryAgain()
    {
        this.closeGameOver();
        this.restartGame();
    }

    goMenu()
    {
        this.scene.start('menuScene');
        this.game.sound.stopAll();
    }

    restartGame()
    {
        this.scene.restart();
    }
}
