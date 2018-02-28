import Compositor from './Compositor.js';
import {Matrix} from './Math.js';
import TileCollider from './TileCollider.js';

export default class Level {
    constructor() {
        this.comp = new Compositor(this);
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
        this.gravity = 2500;
        this.debug = false;

        window.level = this;
    }

    update(context, camera, deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
        });

        this.comp.draw(context, camera);
    }
}

