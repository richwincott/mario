export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement("canvas");
    buffer.width = 1500;
    buffer.height = 480;

    const context = buffer.getContext("2d");
    
    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(context, tile.name, x, y);
    });

    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
    }
}

export function createSpriteLayer(entities) {
    const buffer = document.createElement("canvas");
    buffer.width = 64;
    buffer.height = 64;
    const bufferContext = buffer.getContext('2d');

    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            bufferContext.clearRect(0, 0, 64, 64);
            entity.draw(bufferContext);
            context.drawImage(
                buffer, 
                entity.pos.x - camera.pos.x, 
                entity.pos.y - camera.pos.y);
        }); 
    }
}

export function createCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisionLayer(context, camera) {
        if (level.debug) {
            context.strokeStyle = "blue";
            resolvedTiles.forEach(({x, y}) => {
                context.beginPath();
                context.rect(x - camera.pos.x, y - camera.pos.y, tileSize, tileSize);
                context.stroke();
            });

            context.strokeStyle = "red";
            level.entities.forEach(entity => {
                context.beginPath();
                context.rect(entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y, entity.size.x, entity.size.y);
                context.stroke();
            });
        }

        resolvedTiles.length = 0;
    }
}