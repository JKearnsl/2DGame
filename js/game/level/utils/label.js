
export class LabelStyle {
    constructor(
        font = "Arial",
        font_size = 20,
        text_color = "white",
        text_align = "center",
        text_baseline = "middle"
    ) {
        this.font = font;
        this.font_size = font_size;
        this.text_color = text_color;
        this.text_align = text_align;
        this.text_baseline = text_baseline;
    }
}


export default class Label {
    constructor(title, width, height, x, y, style = new LabelStyle) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.style = style;
    }

    draw(ctx) {
        ctx.font = this.style.font_size + "px " + this.style.font;
        ctx.fillStyle = this.style.text_color;
        ctx.textAlign = this.style.text_align;
        ctx.textBaseline = this.style.text_baseline;
        ctx.fillText(this.title, this.x + (this.width / 2),  this.y + this.height / 2);
    }
}