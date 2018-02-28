import Entity from './Entity.js';
import {loadMario} from './Loader.js';
import {Physics, Jump, Run} from './traits.js';

export function createMario() {
    return loadMario()
    .then(sprite => {
        const mario = new Entity(90, 0);
        mario.size.set(16, 27);
 
        mario.addTrait(new Jump());
        mario.addTrait(new Run());
        mario.addTrait(new Physics());        

        function routeFrame() {
            if (!mario.jump.ready) {
                return "jump";
            }

            const frames = ["run-1", "run-2", "run-3"];

            if (mario.run.dir != 0) {
                const frameLen = frames.length;
                return frames[Math.floor(mario.run.distance / 10) % frameLen];
            }               
            else
                return "idle";
        }

        mario.draw = function drawMario(context) {
            sprite.draw(context, routeFrame(), 0, 0, mario.run.heading < 1);
        }

        return mario;
    })
}