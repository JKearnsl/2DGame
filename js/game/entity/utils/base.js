import {sleep} from "../../level/utils/time.js";

export default class Entity {
    is_in_jump = false;

    constructor(
        title = "Entity",
        x = 0,
        y = 0,
        width = 32,
        height = 32,
        speed = 1,
        health = 100,
        damage = 10,
        armor = 0,
        gravity = 1,
        texture = null
    ) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.velocity_y = 1; // возможно удалить
        this.health = health;
        this.damage = damage;
        this.armor = armor;
        this.gravity = gravity;
        this.texture = texture;
        this.jump_audio = new Audio("assets/jump.mp3");
        this.jump_audio.volume = 0.3;
    }

    die() {

    }

    clear() {

    }


    left() {
        this.x -= this.speed;
    }

    right() {
        this.x += this.speed;
    }

    jump() {
        if (this.is_in_jump) return;
        this.jump_audio.play();

        const jump_height = 150;

        let thread = setInterval(() => {
            this.is_in_jump = true;
            for (let i = 0; i < jump_height; i++) {
                setTimeout(() => {this.y -= this.velocity_y;}, i * 2)
            }
            for (let i = 0; i < jump_height; i++) {
                setTimeout(() => {this.y += this.velocity_y;}, i * 7)
            }
            setTimeout(() => {this.is_in_jump = false;}, jump_height * 7)
            clearInterval(thread);
        })

        console.log("Entity '" + this.title + ": jumped");
    }


}