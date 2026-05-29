import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paw-background',
  standalone: true,
  imports: [],
  templateUrl: './paw-background.html',
  styleUrl: './paw-background.scss',
})
export class PawBackground implements OnInit {
  paws: { x: number, y: number, delay: number, rotation: number }[] = [];

  ngOnInit() {
    for (let i = 0; i < 16; i++) {
      this.paws.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        rotation: Math.random() * 360
      });
    }
  }
}
