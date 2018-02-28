export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(alias, x, y) {
        const buffers = [false, true].map(flip => {
            var buffer = document.createElement("canvas");
            buffer.width = this.width;
            buffer.height = this.height;
            var context = buffer.getContext("2d");
            if (flip) {
                context.scale(-1, 1);
                context.translate(-this.width, 0);
            }
            context.drawImage(this.image, x, y, this.width, this.height, 0, 0, this.width, this.height);
            return buffer;
        })
        this.tiles.set(alias, buffers);
    }

    defineTile(alias, x, y) {
        this.define(alias, x * this.width, y * this.height);
    }

    draw(context, alias, x, y, flip = false) {
        context.drawImage(this.tiles.get(alias)[flip ? 0 : 1], x, y);
    }

    drawTile(context, alias, x, y) {
        this.draw(context, alias, x, y);
    }
}