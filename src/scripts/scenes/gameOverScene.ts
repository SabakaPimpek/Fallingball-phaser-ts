import Text from "../ui/text";

export default class GameOver extends Phaser.Scene
{
    score
    CONFIG
    background
    title
    txt_score
    btn_menu
    lbl_menu: Text

    constructor()
    {
        super({ key: 'GameOverScene', active: false});
    }

    init(data)
    {
        //Score data passed from 'Play' scene
        this.score = data.score;

        this.CONFIG = this.game.config;
    }

    create()
    {
        this.title = new Text(
            this, this.CONFIG.width / 2, this.CONFIG.height/2 - 130, 'Game Over', 'title'
        ).setColor("black");
        
        this.txt_score = new Text(
            this, this.CONFIG.width / 2, this.CONFIG.height/2 - 50, 'Wynik: ' + this.score, 'title'
        ).setColor("black")

        const menuButton = this.add.sprite(this.CONFIG.width / 2 - 100, this.CONFIG.height/2 + 50, 'MenuButton')
        .setScale(1.5)
        .setInteractive()
        .on('pointerup', () => {
            this.tweens.add({
                targets: restartButton,
                duration: 100, // Czas trwania tweena w milisekundach
                scaleX: 1.3,    // Skaluj szerokość do 50%
                scaleY: 1.3,    // Skaluj wysokość do 50%
                ease: 'Sine.easeInOut',
                onComplete: this.clickMenu  
                // yoyo: false,     // Powtórz efekt w drugą stronę (powiększ)
              });
            // this.clickMenu();
        }, this)

        const restartButton = this.add.sprite(this.CONFIG.width / 2 + 100, this.CONFIG.height/2 + 50, 'PlayButton')
        .setScale(1.5)
        .setInteractive()
        .on('pointerup', () => {
            this.tweens.add({
                targets: restartButton,
                duration: 100, // Czas trwania tweena w milisekundach
                scaleX: 1.3,    // Skaluj szerokość do 50%
                scaleY: 1.3,    // Skaluj wysokość do 50%
                ease: 'Sine.easeInOut',
                onComplete: this.clickTryAgain  
                // yoyo: false,     // Powtórz efekt w drugą stronę (powiększ)
              });
            // this.clickMenu();
        }, this)

        this.add.rectangle(this.CONFIG.width/2, this.CONFIG.height/2, 400, 400, 0xF4F4F4).setDepth(-1).setOrigin(0.5,0.5)

        this.add.rectangle(this.CONFIG.width/2, this.CONFIG.height/2, this.CONFIG.width, this.CONFIG.height, 0x00000)
            .setAlpha(0.6)
            .setDepth(-5)

    }
    
    clickMenu()
    {
        // this.time.addEvent({
        //     delay: 200,                // ms
        //     callback: () => {
                
        //     },
        //     loop: false
        // });

        this.events.emit('clickMenu');
    }
    
    clickTryAgain()
    {
        // this.time.addEvent({
        //     delay: 200,                // ms
        //     callback: () => {
               
        //     },
        //     loop: false
        // });

         this.events.emit('tryAgain');
    }
    
        // createAllButtons(x: number, y: number, w: number, h: number)
        // {
        //     // Go Menu
        //     console.log(x, y,);
    
        //     this.btn_menu = this.createButton(
        //         x + 0.25*w, y + 0.85*h, this.clickMenu
        //     )
    
        //     //... Text for menu button
            
        //     this.lbl_menu = new Text(
        //         this,
        //         x + 0.25*w, 
        //         y + 0.85*h,
        //         'Menu',
        //         'standard'
        //     )
    
        //     // Try Again
    
        //     this.btn_menu = this.createButton(
        //         x + 0.75*w, y + 0.85*h, this.clickTryAgain
        //     )
    
        //     //... Text for menu button
            
        //     this.lbl_menu = new Text(
        //         this,
        //         x + 0.75*w,
        //         y + 0.85*h,
        //         '↻',
        //         'standard'
        //     )
    
        // }
    
        // createButton(centerX, centerY, callback)
        // {
        //     let w = 4.5 * 32;
        //     let h = 2 * 32;
        //     let r = 10;
    
        //     let x = centerX - 0.5*w;
        //     let y = centerY - 0.5*h
        
        //     const btn: any = this.add.graphics({x: x, y: y});
    
        //     let hit_area = new Phaser.Geom.Rectangle(0, 0, w, h);
        //     btn.setInteractive(hit_area, Phaser.Geom.Rectangle.Contains);
    
        //     btn.fillStyle(0x39314B, 1);
        //     btn.fillRoundedRect(0, 0, w, h, r);
    
            
        //     btn.myDownCallback = () => {
        //         btn.clear();
        //         btn.fillStyle(0x827094, 1);
        //         btn.fillRoundedRect(0, 0, w, h, r);
        //     };
            
        //    btn.myOutCallback = () => {
        //         btn.clear();
        //         btn.fillStyle(0x39314B, 1);
        //         btn.fillRoundedRect(0, 0, w, h, r);
        //     };
    
        //     btn.on('pointerup', callback, this);
        //     btn.on('pointerdown', btn.myDownCallback, this);
        //     btn.on('pointerout', btn.myOutCallback, this);
    
        //     //
        //     return btn;
        // }
}