export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, (event) => {
            if (event.buttons === 1) {
                entity.vel.x = 0;
                entity.vel.y = 0;
                entity.pos.x = event.offsetX + camera.pos.x;
                entity.pos.y = event.offsetY + camera.pos.y;
            }
            else if (event.buttons === 2 && lastEvent && lastEvent.buttons === 2 && lastEvent.type == "mousemove") {
                camera.pos.x -= event.offsetX - lastEvent.offsetX;
            }

            lastEvent = event;
        })
    });

    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}