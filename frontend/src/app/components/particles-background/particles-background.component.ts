import { Component, ViewChild, ElementRef } from '@angular/core';
import { Particle } from 'src/app/models/particle.model';

@Component({
    selector: 'app-particles-background',
    templateUrl: './particles-background.component.html',
    styleUrls: ['./particles-background.component.scss']
})
export class ParticlesBackgroundComponent {
    @ViewChild('canvas', null)
    public canvas: ElementRef;
    private ctx: any;
    private particles: Particle[] = [];

    constructor() {
    }

    ngOnInit() {
        console.log('Canvas', this.canvas.nativeElement)
        this.ctx = this.canvas.nativeElement.getContext("2d");
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        for (let i = 0; i < 300; i++) {
            let size = Math.random() * 7;
            let x = Math.random() * (innerWidth - size * 2);
            let y = Math.random() * (innerHeight - size * 2);
            let directionX = (Math.random() * .2) - .1;
            let directionY = (Math.random() * .2) - .1;
            let color = 'rgba(100,100,100,' + Math.random() * .2 +')';
            this.particles.push(new Particle(x, y, directionX, directionY, size, color));
        }

        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.canvas, this.ctx);
        }
    }
}