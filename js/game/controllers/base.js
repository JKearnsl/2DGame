import Player from "../entity/player.js";
import detectCollision from "../level/utils/collision.js";

export default class EventController {
    handler_list = [];
    event_list = [];

    event = null;

    constructor(level) {
        this.level = level

    }

    registerKeyBoardHandler(key, handler, entity){
        this.handler_list.push(
            {"key": key, "handler": handler, "entity": entity}
        )
    }

    registerEventHandler(handler) {
        this.event_list.push(handler)
    }


    keyboard_controller(event) {
        for (let i = 0; i < this.handler_list.length; i++ ){
            let obj = this.handler_list[i];
            if (obj.key === event.key){
                obj.handler(this.level, obj.entity)
            }
        }
    }

    clear(){
        document.removeEventListener(
            this.event,
            this.keyboard_controller,
            false
        );
        this.handler_list = [];
        this.event_list = [];
    }

    stop(){
        clearInterval(this.event_loop)
    }


    loop(){
        document.addEventListener("keydown", (event) => {
            this.event = event;
            this.keyboard_controller(event);
        }, false);

        this.event_loop = setInterval(
            () => {
                this.level.render()

                let is_collision = false;
                for (let i = 0; i < this.level.entities.length; i++){
                    let entity = this.level.entities[i];
                    for (let j = 0; j < this.level.obj_list.length; j++) {
                        let object = this.level.obj_list[j];
                        is_collision = detectCollision(entity, object)
                        if (is_collision) {
                            console.log(`[Collision] ${entity.title} vs ${object.title} = ${is_collision}`);
                            break;
                        }
                    }
                }
                for (let i = 0; i < this.event_list.length; i++){
                    let handler = this.event_list[i];
                    handler(this.level, is_collision, this)
                }
            },
            1000 / 30
        )
    }
}