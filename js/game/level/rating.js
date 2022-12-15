import {default as Button, ButtonStyle} from "./utils/button.js";
import LevelBuilder from "./utils/level.js";
import menu from "./menu.js";
import Label, {LabelStyle} from "./utils/label.js";

function menu_clicked(level, btn) {
    console.log("Start clicked!");
    level.clear();
    menu(level.ctx).load();
}


export default function rating(ctx) {
    let menu_button = new Button(
        "Назад",
        70,
        30,
        20,
        20,
        new ButtonStyle(

        ),
        menu_clicked
    );

    const level = new LevelBuilder(ctx, "Rating");

    level.setBackgroundImg("./assets/rating/background.jpg");
    level.setAudio("./assets/rating/background_music.mp3");
    level.addButton(menu_button);

    let rating = JSON.parse(localStorage.getItem("rating"));

    if (rating !== null) {
        let rating_table = rating["table"];

        // Сортировка рейтинга по очкам
        for (let i = 0; i < rating_table.length; i++) {
            for (let j = 0; j < rating_table.length; j++) {
                if (rating_table[i].score > rating_table[j].score) {
                    let temp = rating_table[i];
                    rating_table[i] = rating_table[j];
                    rating_table[j] = temp;
                }
            }
        }

        // Вывод рейтинга
        for (let i = 0; i < 5; i++) {
            let row = rating_table[i];
            console.log(row);
            if (row !== undefined) {
                let rating_label = new Label(
                `${i + 1}. ${row.name} - ${row.score}`,
                20,
                20,
                210,
                100 + i * 40,
                new LabelStyle(
                    "Arial",
                    18,
                    "black"
                ));
                level.addLabel(rating_label);
            }
        }
    } else
    {
        let rating_label = new Label(
            "Рейтинг пуст",
            20,
            20,
            210,
            100,
            new LabelStyle(
                "Arial",
                20,
                "black"
            ));
        level.addLabel(rating_label);
    }


    return level.build()
}
