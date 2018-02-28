import {Vector} from './Math.js';

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {
        
    }

    update() {
        console.warn("Unhandled update call in trait!");
    }
}

export default class Entity {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.size = new Vector(0, 0);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }

    update(deltaTime, level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        });
    }
}