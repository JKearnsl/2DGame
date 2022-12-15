import {default as Button, ButtonStyle} from "./utils/button.js";
import LevelBuilder from "./utils/level.js";
import one from "./one.js";
import rating from "./rating.js";
import settings from "./settings.js";
import Label, {LabelStyle} from "./utils/label.js";

function start_clicked(level, btn) {
    console.log("Start clicked!");
    level.clear();
    one(level.ctx).load();
}

function rating_clicked(level, btn) {
    console.log("Rating clicked!");
    level.clear();
    rating(level.ctx).load();
}

function settings_clicked(level, btn) {
    console.log("Rating clicked!");
    level.clear();
    let settings_level = settings(level.ctx);
    settings_level.load();

}

export default function menu(ctx) {
    let play_button = new Button(
        "Старт",
        80,
        30,
        200,
        210,
        new ButtonStyle(),
        start_clicked
    );

    let rating_button = new Button(
        "Рейтинг",
        90,
        30,
        195,
        245,
        new ButtonStyle(),
        rating_clicked
    );

    let settings_button = new Button(
        "Настройки",
        100,
        30,
        190,
        280,
        new ButtonStyle(),
        settings_clicked
    );

    let game_name = new Label(
        "Супер игра",
        20,
        20,
        160,
        50,
        new LabelStyle(
            "Arial",
            50,
            "black"
        )
    )

    const level = new LevelBuilder(ctx, "Menu");

    level.setBackgroundImg("./assets/menu/background.png");
    level.setAudio("./assets/menu/background_music.mp3");
    level.addLabel(game_name);
    level.addButton(play_button);
    level.addButton(rating_button);
    level.addButton(settings_button);

    return level.build()
}