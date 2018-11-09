export default class TestBackground {
    static render(ctx, width, height) {
        for(let x = 0; x < width; x += 32) {
            for(let y = 0; y < height; y += 32) {
                if((x + y) % 64 === 0) {
                    ctx.fillStyle = "#CCCCCC";
                } else {
                    ctx.fillStyle = "white";
                }
                ctx.fillRect(x, y, 32, 32);
            }
        }
    }
}