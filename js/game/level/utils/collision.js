
export default function detectCollision(entity, object){
    let dx = entity.x - object.x; // Расстояние между центрами по X
    let dy = entity.y - object.y; // Расстояние между центрами по Y
    let rx = (entity.width + object.width)/2; // Минимальноe расстояние по X
    let ry = (entity.height + object.height)/2; // Минимальное расстояние по Y

    return Math.abs(dx) < rx && Math.abs(dy) < ry;
}
