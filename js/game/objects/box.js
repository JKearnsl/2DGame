import BaseObject from "./base.js";

export default class BoxObject extends BaseObject {
    constructor(x, y, width, height) {
        let texture = null;
        super("Box", x, y, width, height, texture);
    }
}
