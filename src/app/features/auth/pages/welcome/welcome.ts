import { Component } from '@angular/core';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [Navbar, RouterLink ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome implements OnInit {
  paws: { x: number, y: number, delay: number, rotation: number }[] = [];

  ngOnInit() {
    // Génère 15 pattes aléatoires
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
