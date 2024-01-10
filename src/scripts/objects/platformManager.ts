// export default class PlatformManager {
//     scene


//     playerSpeed: number
    
//       constructor(scene: Phaser.Scene) {
//         this.scene = scene
//       }
    
//       public update()
//       {
//         createPlatform(xPos: number)
//   {
//     const screenWidth = this.cameras.main.width;

//        // Szerokość ekranu
//            // Szerokość kafelka
//       const tileWidth = 16 * this.mapScale;

//            // Ilość kafelków, jakie mieszczą się na ekranie
//       const tileCount = Math.ceil(screenWidth / tileWidth);
      
//       const holeStart = Phaser.Math.Between(0, tileCount-2);

//       const holeEnd = holeStart + 2; 

//       let group = this.physics.add.group();
     
//            // Tworzenie kafelków

//       for (let i = 0; i < tileCount + 1; i++) {
//         if (i >= holeStart && i <= holeEnd) {
//           continue; 
//       }

//         console.log("object");

//         let tile = this.physics.add.sprite(i * tileWidth, xPos, 'tile');
//         // tile.setTexture("spritesheet", 158)
//         tile.setScale(this.mapScale);

//         group.add(tile);
        
//       }

//       return group.getChildren() as Phaser.GameObjects.Sprite[];
//   }
//       }
//     }
    