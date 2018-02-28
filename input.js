import Keyboard from './KeyboardState.js';

export function setupKeyboard(entity, level) {    
    const input = new Keyboard();

    input.addMapping("KeyP", keyState => {
        if (keyState)
            entity.jump.start();
        else
            entity.jump.cancel();
    });

    input.addMapping("KeyO", keyState => {
        if (keyState)
            entity.run.speed = 12000;
        else
            entity.run.speed = 7000;
    });

    input.addMapping("KeyD", keyState => {
        entity.run.dir += keyState ? 1 : -1;
    });

    input.addMapping("KeyA", keyState => {
        entity.run.dir += keyState ? -1 : 1;
    });

    input.addMapping("KeyI", keyState => {
        level.debug = keyState ? true : false;
    });
    
    return input;
}