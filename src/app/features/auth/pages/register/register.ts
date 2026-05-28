import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-register',
  imports: [Navbar],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
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
