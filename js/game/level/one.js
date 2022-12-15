import LevelBuilder from "./utils/level.js";
import EntityFactory from "../entity/utils/factory.js";
import EventController from "../controllers/base.js";
import {player_game_over, player_jump, player_score} from "../controllers/player.js";
import BoxObject from "../objects/box.js";
import {objects_wave} from "../controllers/objects.js";

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


export default function one(ctx) {
    const level = new LevelBuilder(ctx, "Level 1", 1);

    const player = EntityFactory.create(
        "player",
        "SuperName",
        190,
        270,
        32,
        32,
        1,
        100,
        10,
        0,
        1,
        null
    );



    level.setBackgroundImg("./assets/level1/background.png");
    level.setAudio("./assets/level1/background_music.mp3");
    level.addEntity(player);

    let prev_x = 500;
    for (let i = 0; i < 3; i++) {
        let x = prev_x + randomInteger(150, 300);
        prev_x = x;
        const box_object = new BoxObject(
            x,
            270,
            32,
            32,
        )
        level.addObj(box_object)
    }


    // level.addEntity()

    let resp_level = level.build();
    let event = new EventController(resp_level);
    event.registerEventHandler(objects_wave);
    event.registerEventHandler(player_game_over);
    event.registerEventHandler(player_score);
    event.registerKeyBoardHandler(
        " ",
        player_jump,
        player
    );
    event.loop();
    return resp_level;
}
