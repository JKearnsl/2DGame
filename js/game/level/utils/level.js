import drawImageProp from "../../utils/image.js";
import {default as get_mouse_position, is_inside} from "./position.js";
import {sleep} from "./time.js";
import Player from "../../entity/player.js";

function button_click_handler(event, options) {
    // сделать возможным выносимость логики
    let mousePos = get_mouse_position(options.level.touch_ctx.canvas, event);
    let rect = {
        x: options.x,
        y: options.y,
        width: options.button.width,
        height: options.button.height
    };
    if (is_inside(mousePos, rect)) {
        options.button.click(options.level.touch_ctx, options.level, options.x, options.y);
    }
    // TODO: пофиксить
    sleep(100);

}

function button_mousemove_handler(event, options) {
    let mousePos = get_mouse_position(options.level.touch_ctx.canvas, event);
    let rect = {
        x: options.x,
        y: options.y,
        width: options.button.width,
        height: options.button.height
    };
    if (is_inside(mousePos, rect)) {
        options.button.hover(options.level.touch_ctx, options.x, options.y);
    } else {
        options.button.normal(options.level.touch_ctx, options.x, options.y);
    }
}



class Level {
    background_cache_img = null;
    touch_event_list = [];
    touch_ctx = null;

    time_since_start = 0;
    timer = null;

    constructor(builder) {
        this.ctx = builder.ctx;
        this.title = builder.title;
        this.difficulty_level = builder.difficulty_level;
        this.background = builder.background;
        this.entities = builder.entity_list;
        this.buttons = builder.button_list;
        this.obj_list = builder.obj_list;  // Список физических объектов (препятствий)
        this.label_list = builder.label_list;
        this.audio = builder.music;
    }



    clear() {
        clearInterval(this.timer);
        // Очистка событий
        for (let i = 0; i < this.touch_event_list.length; i++) {
            this.touch_ctx.canvas.removeEventListener(
                this.touch_event_list[i].event,
                this.touch_event_list[i].handler,
                false
            );
        }
        // Очистка объектов
        // TODO: Добавить очистку физических объектов
        // Очистка сущностей
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].clear();
        }
        if (this.audio) {
            this.audio.pause();
        }
        console.log(`Cleared ${this.title}!`);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.touch_ctx.clearRect(0, 0, this.touch_ctx.canvas.width, this.touch_ctx.canvas.height);

    }

    render() {
        if (this.background_cache_img)
            drawImageProp(this.ctx, this.background_cache_img);
        // ----------------- Отрисовка сущностей --------------
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            this.drawEntity(entity);
        }
        // ------------- Отрисовка текстовых марок ------------
        for (let i = 0; i < this.label_list.length; i++) {
            let label = this.label_list[i];
            this.drawLabel(label);
            console.log(`[Label] '${label.title}' spawned!`);
        }
        // ---------------- Отрисовка объектов ----------------
        for (let i = 0; i < this.obj_list.length; i++) {
            let object = this.obj_list[i];
            this.drawObject(object);
        }
        // ----------------------------------------------------
    }

    addEvent(type, handler, options, canvas = this.touch_event_list.canvas) {
        let _ = (event) => handler(event, options)
        canvas.addEventListener(
            type,
            _,
            false
        );
        this.touch_event_list.push({"event": type, "handler": _});
    }

    drawEntity(entity) {
        this.ctx.fillStyle = "red";  // Получать от entity
        this.ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
        // console.log(`[Entity] '${entity.title}' spawned!`);
    }

    drawObject(object) {
        console.log(`[Object] Spawning '${object.title}'...`);
        this.ctx.fillStyle = "orange";  // Получать от entity
        this.ctx.fillRect(object.x, object.y, object.width, object.height);
        // console.log(`[Object] '${object.title}' spawned!`);
    }

    drawLabel(label) {
        label.draw(this.ctx);
    }

    load() {
        this.timer = setInterval(() => this.time_since_start++, 1000);
        console.log(`[Level] Loading '${this.title}'...`);
        this.background.addEventListener("load", () => {
            // -- Отрисовка фона
            drawImageProp(this.ctx, this.background);
            this.background_cache_img = this.background //this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.load_buttons();
            this.render();
        });
        if (this.audio) {
            this.audio.addEventListener("canplaythrough", event => {
                this.audio.volume = 0.5;
                this.audio.play();
            });
        }


        console.log(`[Level] '${this.title}' loaded!`);
    }

    load_buttons() {
        if (this.touch_ctx === null) {
            const canvas = document.getElementById("touch_window");
            this.touch_ctx = canvas.getContext("2d");
        }
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            let options = {
                level: this,
                button: button,
                x: button.x,
                y: button.y
            };
            button.draw(this.touch_ctx, button.x, button.y); // кнопка не должна знать своё местоположение
            this.addEvent("click", button_click_handler, options, this.touch_ctx.canvas);
            this.addEvent("mousemove", button_mousemove_handler, options, this.touch_ctx.canvas);
        }
    }

    getTimeSinceStart() {
        return this.time_since_start;
    }


}


export default class LevelBuilder {
    entity_list = [];
    obj_list = [];
    button_list = [];
    label_list = []

    constructor(ctx, title, difficulty_level = 0) {
        this.ctx = ctx;
        this.title = title;
        this.difficulty_level = difficulty_level;
    }

    addEntity(entity) {
        this.entity_list.push(entity);
    }

    addObj(obj) {
        this.obj_list.push(obj);
    }


    setBackgroundImg(image_path) {
        let background = new Image();
        background.src = image_path;
        this.background = background;
    }

    setAudio(music_path) {
        this.music = new Audio(music_path);
    }

    addLabel(label_obj){
        this.label_list.push(label_obj)
    }

    addButton(button) {
        // this.button_list.push({button: button, x: x, y: y});
        this.button_list.push(button);
    }

    build() {
        return new Level(this);
    }
}