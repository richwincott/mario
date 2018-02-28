import {Vector} from './Math.js';
import {Trait} from './Entity.js';

export class Physics extends Trait {
    constructor() {
        super('physics');
    }

    update(entity, deltaTime, level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity);

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity);

        entity.vel.y += level.gravity * deltaTime;
    }
}

export class Jump extends Trait {
    constructor() {
        super('jump');
        this.ready = false;
        this.engageTime = 0;
        this.duration = 0.15;
        this.speedBoost = 0;
    }

    update(entity, deltaTime, level) {
        if (this.engageTime > 0) {
            entity.vel.y = -15000 * (Math.abs(entity.vel.x) < 150 ? 1 : 1.4) * deltaTime;
            this.engageTime -= deltaTime;
        }

        this.ready = false;
    }

    obstruct(entity, side) {
        this.ready = true;
    }

    start() {
        if (this.ready) {
            this.engageTime = this.duration;
        }
    }

    cancel() {
        this.engageTime = 0;
    }
}

export class Run extends Trait {
    constructor() {
        super('run');
        this.speed = 5700;
        this.deceleration = 1000;
        this.distance = 0;
        this.dir = 0;
        this.heading = 1;
    }

    update(entity, deltaTime, level) {
        const absX = Math.abs(entity.vel.x);

        if (this.dir != 0) {
            entity.vel.x = this.dir * this.speed * deltaTime;

            this.heading = this.dir;
            
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else if (entity.vel.x !== 0) {
            const decel = Math.min(absX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        }
        else
            this.distance = 0;
    }
}