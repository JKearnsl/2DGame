import menu from './level/menu.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function game(ctx) {
    menu(ctx).load();
}
game(ctx);