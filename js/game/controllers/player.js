import Button, {ButtonStyle} from "../level/utils/button.js";
import menu from "../level/menu.js";
import Label from "../level/utils/label.js";


export function player_jump(level, entity) {
    console.log("Jumped");
    entity.jump();
}

export function player_score(level) {
    let label = new Label(
        "Score: " + level.getTimeSinceStart(),
        20,
        20,
        390,
        20
    )
    level.drawLabel(label);
}

export function player_game_over(level, is_collision, loop) {
    if (!is_collision) {
        return null;
    }
    console.log("Collision!");
    let score = level.getTimeSinceStart();
    loop.stop();
    loop.clear();

    let audio = new Audio("assets/game_over.mp3");
    audio.volume = 0.4;
    audio.play();

    let ctx = level.ctx;
    ctx.fillStyle = "rgba(108, 122, 137, 0.7)";
    ctx.fillRect(0, 0, 500, 500);
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Игра окончена", 230, 150);
    ctx.fillText("Ваш счет: " + score, 220, 200);

    let rating = JSON.parse(localStorage.getItem("rating"));
    if (rating == null) {
        rating = {"table": []};
    }
    let rating_table = rating["table"];

    let player_name = localStorage.getItem("name");
    if (rating_table.length === 0) {
        rating_table.push({"name": player_name, "score": score});
    } else {
        // Если игрок уже есть в рейтинге, то обновляем его счет, если он больше
        let player_index = -1;
        for (let i = 0; i < rating_table.length; i++) {
            let row = rating_table[i];
            if (row["name"] === player_name) {
                player_index = i;
                break;
            }
        }
        if (player_index !== -1) {
            if (rating_table[player_index]["score"] < score) {
                rating_table[player_index]["score"] = score;
            }
        } else {
            // Если игрока нет в рейтинге, то добавляем его
            rating_table.push({"name": player_name, "score": score});
        }
    }
    localStorage.setItem("rating", JSON.stringify(rating));

    let button = new Button(
        "В главное меню",
        200,
        40,
        130,
        240,
        new ButtonStyle(),
        () => {
            level.clear();
            menu(ctx).load();
        }
    )
    level.buttons.push(button);
    level.load_buttons()
}
