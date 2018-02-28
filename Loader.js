import SpriteSheet from './SpriteSheet.js';
import Level from './Level.js';
import {createBackgroundLayer, createSpriteLayer, createCollisionLayer} from './layers.js';

const loadImage = (path) => {
    return new Promise(resolve => {
        fetch(path)
        .then(response => response.blob())
        .then(blob => {
            const image = new Image;
            image.src = URL.createObjectURL(blob);
            image.addEventListener("load", () => {
                resolve(image);
            });            
        });
    });
}

const loadConfig = (name) => {
    return new Promise(resolve => {
        fetch('configs/' + name)
        .then(response => response.json())
        .then(data => {
            resolve(data);          
        });
    });
}

export const loadLevel = (name) => {
    return Promise.all([
        loadImage('52571.png'),
        loadConfig(name + '.json')   
    ]).then(([levelImage, levelConfig]) => {
        const backgroundSprites = new SpriteSheet(levelImage, 32, 32);
        for (var tile in levelConfig.define) {
            backgroundSprites.define(tile, levelConfig.define[tile][0], levelConfig.define[tile][1]);
        }

        const level = new Level();

        createTiles(level, levelConfig.backgrounds);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        const collisionLayer = createCollisionLayer(level);
        level.comp.layers.push(collisionLayer);

        return(level);
    });
}

export const loadMario = () => {
    return new Promise(resolve => {
        Promise.all([
            loadImage('mario.gif'),
            loadConfig('mario.json')      
        ]).then(([marioImage, marioConfig]) => {
            const marioSprites = new SpriteSheet(marioImage, 16, 27)
            for (var tile in marioConfig.define) {
                marioSprites.define(tile, marioConfig.define[tile][0], marioConfig.define[tile][1]);
            }

            resolve(marioSprites);
        })
    });
}

export function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            if (!y1 && !y2) {
                level.tiles.set(x1 * 32, x2 * 32, {
                    name: background.tile
                });
            }
            else {
                for (let x = x1; x < x2; x++) {
                    for (let y = y1; y < y2; y++) {
                        level.tiles.set(x * 32, y * 32, {
                            name: background.tile
                        });
                    }
                }
            }
        });
    });
}