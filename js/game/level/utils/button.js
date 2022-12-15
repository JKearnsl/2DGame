
export class ButtonStyle {
    font = "Arial";
    font_size = 20;
    text_color = "black";
    background_color = "white";
    hover_background_color = "grey";
    hover_text_color = "white";
    click_background_color = "yellow";
    click_text_color = "black";
}


export default class Button {
    click_audio = null;

    constructor(title, width, height, x, y, style = new ButtonStyle(), callback = null) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.style = style;
        this.callback = callback;

        this.click_audio = new Audio("assets/button_click.mp3");
    }

    draw(ctx, x, y, background_color = null, text_color = null) {
        // ужасная логика: нелогично, когда кнопка рисует себя сама
        if (background_color == null)
            background_color = this.style.background_color;

        if (text_color == null)
            text_color = this.style.text_color;

        ctx.font = this.style.font_size + "px " + this.style.font;
        ctx.fillStyle = background_color;
        ctx.fillRect(x, y, this.width, this.height);

        ctx.fillStyle = text_color;
        ctx.textAlign = "center"
        ctx.textBaseline = "middle";
        ctx.fillText(this.title, x + (this.width / 2),  y + this.height / 2);
    }

    normal(ctx, x, y) {
        this.draw(ctx, x, y);
    }

    click(ctx, level, x, y) {
        this.click_audio.play();
        this.draw(ctx, x, y, this.style.click_background_color, this.style.click_text_color);
        if (this.callback) {
            this.callback(level, this);
        }
    }

    hover(ctx, x, y) {
        this.draw(ctx, x, y, this.style.hover_background_color, this.style.hover_text_color);
    }
}