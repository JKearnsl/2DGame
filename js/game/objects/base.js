
export default class BaseObject {
    constructor(title, x, y, width, height, texture = null) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.texture = texture;
    }

}