export class Particle {
    public x: number;
    public y: number;
    public directionX: number;
    public directionY: number;
    public size: number;
    public color: string;

    constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
  
    draw(ctx: any){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update(canvas: any, ctx: any){
      if (this.x + this.size > canvas.nativeElement.width || this.x - this.size < 0){
        this.directionX = -this.directionX;
      }
      if (this.y + this.size > canvas.nativeElement.height || this.y - this.size < 0){
        this.directionY = -this.directionY;
      }
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw(ctx);
    }
}