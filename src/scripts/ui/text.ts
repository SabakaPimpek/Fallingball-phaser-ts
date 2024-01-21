
export default class Text {
    ctx: Phaser.Scene
    x: number
    y: number
    text: string
    style
    origin
    obj

    constructor (ctx, x, y, string, style, origin = "number")
    {
        this.ctx    = ctx;
        this.x      = x;
        this.y      = y;

        this.text   = string;

        this.style  = this.initStyle(style);
        this.origin = this.initOrigin(origin);

        this.obj = this.createText();
    }

    // INIT -----
    initStyle(key)
    {
        let style = {
            fontFamily: 'Roboto',
            fontSize: 32,
            color: 0x000000,
            align: 'center'
        };

        switch (key.toLowerCase())
        {
            case 'title':
                style.fontSize = 64;
                break;
            case 'preload':
                style.fontSize = 48;
                break;
            case 'standard':
                style.fontSize = 32;
                break;
        }

        return style;
    }

    initOrigin(origin)
    {
        if (typeof origin === 'number')
        {
            return {
                x: origin,
                y: origin
            };
        }
        else if(typeof origin === 'object') return origin;
        else {
            return {
                x: 0.5,
                y: 0.5
            };
        }
    }

    // Text object ------
    createText()
    {
        const obj = this.ctx.add.text(
            this.x,
            this.y,
            this.text,
            {
                fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize,
                align: this.style.align
            }
        );

        obj.setOrigin(this.origin.x, this.origin.y)

        return obj;
    }

    destroy()
    {
        this.obj.destroy();

        this.obj = false;
    }

    // Setters ----------------------------
    setText (string: string)
    {
        this.text = string;
        this.obj.setText(string);
    }

    setX (x: number)
    {
        this.x = x;
        this.obj.setX(x);
    }

    setY (y: number)
    {
        this.y = y;
        this.obj.setY(y);
    }

    setOrigin (origin: number)
    {
        this.origin = this.initOrigin(origin);
        this.obj.setOrigin(origin);
    }

    setDepth (depth: number)
    {
        this.obj.setDepth(depth)
    }

    setScrollFactor (scrollX: number, scrollY: number)
    {
        this.obj.setScrollFactor(scrollX, scrollY)
    }

    setVisible(visible: boolean)
    {
        this.obj.setVisible(visible );
    }

    setColor(color)
    {
        this.obj.style.setColor(color)
    }

    //Getters --------
    getCenter () {
        return this.obj.getCenter();
    }

    getTopLeft ()
    {
        return this.obj.getTopLeft()
    }

    getTopRight ()
    {
        return this.obj.getTopRight()
    }

    getBottomLeft ()
    {
        return this.obj.getBottomLeft()
    }

    getBottomRight ()
    {
        return this.obj.getBottomRight();
    }
}