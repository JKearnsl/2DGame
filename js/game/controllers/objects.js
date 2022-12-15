
export function objects_wave(level) {
    for (let i = 0; i < level.obj_list.length; i++) {
        let object = level.obj_list[i];
        object.x -= 4;
        if (object.x < -50) {
            object.x = 500;
            let flag = false;
            for (let j = 0; j < level.obj_list.length; j++) {
                let some_object = level.obj_list[j];
                if (Math.abs(some_object.x - object.x) < 100) {
                    flag = true;
                }
            }
            if (flag) {
                object.x += 100;
            }
        }
    }
}
