import Camera from './Camera.js';
import Timer from './Timer.js';
import {createMario} from './entities.js';
import {loadLevel} from './Loader.js';
import {setupMouseControl} from './debug.js'
import {setupKeyboard} from './input.js';

import {createCollisionLayer} from './layers.js';

let main = () => {
    const canvas = document.getElementsByTagName("canvas")[0]
    const context = canvas.getContext("2d");

    Promise.all([
        createMario(),
        loadLevel("1-1")
    ])
    .then(([mario, level]) => {     
        const camera = new Camera();

        level.entities.add(mario);

        window.mario = mario;

        createCollisionLayer(level);

        setupKeyboard(mario, level).listenTo(window);

        setupMouseControl(canvas, mario, camera);

        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {
             
            level.update(context, camera, deltaTime);

            if (mario.pos.x > 200 && mario.pos.x < 842)
                camera.pos.x = mario.pos.x - 200;    

        }
        timer.start();
    });
}

main();