import Entity from './utils/base.js';

// function player_keyboard_controller(event, options) {
//     if (event.key === "ArrowLeft" || event.key === "a") {
//         options.player.left();
//     } else if (event.key === "ArrowRight" || event.key === "d") {
//         options.player.right();
//     } else if (event.key === "ArrowUp" || event.key === "w" || event.key === " ") {
//         options.player.jump();
//     }
// }



export default class Player extends Entity {
    constructor(
        nickname = "Player",
        width = 32,
        height = 32,
        speed = 1,
        health = 100,
        damage = 30,
        armor = 100,
        gravity = 1,
        texture = null
    )
    {
        super(
            nickname,
            width,
            height,
            speed,
            health,
            damage,
            armor,
            gravity,
            texture,
        );
    }

    clear() {
        // очистка хендлера обработчика
        super.clear();
    }
}

