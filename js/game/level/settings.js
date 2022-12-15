import {default as Button, ButtonStyle} from "./utils/button.js";
import LevelBuilder from "./utils/level.js";
import menu from "./menu.js";
import Label, {LabelStyle} from "./utils/label.js";

function menu_clicked(level, btn) {
    console.log("Start clicked!");
    level.clear();
    menu(level.ctx).load();
}

function set_name_clicked(level, btn) {
    let alert_block = document.createElement('div');
    alert_block.className = "alert_block";
    alert_block.innerHTML = ` 
        <strong>Введите имя игрока: </strong> 
        <input type="text" id="player_name"> 
        <button id="set_name" onclick="localStorage.setItem('name', ?)">OK</button>
    `;
    let canvas_container = document.body.querySelector("#canvas-container");
    canvas_container.appendChild(alert_block);

    let set_name_btn = document.getElementById("set_name");
    set_name_btn.onclick = function () {
        let player_name = document.getElementById("player_name").value;
        localStorage.setItem('name', player_name);
        btn.title = localStorage.getItem("name");
        level.render();
        canvas_container.removeChild(alert_block);
    }
}


export default function settings(ctx) {
    let menu_button = new Button(
        "Назад",
        70,
        30,
        20,
        20,
        new ButtonStyle(),
        menu_clicked
    );

    let set_name_button = new Button(
        localStorage.getItem("name"),
        150,
        30,
        220,
        165,
        new ButtonStyle(),
        set_name_clicked
);

    let label_nickname = new Label(
        "Имя игрока: ",
        20,
        20,
        150,
        170,
        new LabelStyle(
            "Arial",
            20,
            "black"
        )
    )
    const level = new LevelBuilder(ctx, "Settings");

    level.setBackgroundImg("./assets/rating/background.jpg");
    level.setAudio("./assets/rating/background_music.mp3");
    level.addButton(menu_button);
    level.addButton(set_name_button);
    level.addLabel(label_nickname);

    return level.build()
}