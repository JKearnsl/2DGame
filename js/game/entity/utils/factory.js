import Player from "../player.js";

export default class EntityFactory
{
    static create(
        entity_type,
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
    )
    {
        if (entity_type === "player")
            return new Player(title, x, y, width, height, speed, health, damage, armor, gravity, texture)
        return undefined
    }
}