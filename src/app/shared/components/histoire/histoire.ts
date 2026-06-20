import { Component } from '@angular/core';
import { PawBackground } from '../paw-background/paw-background';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-histoire',
  imports: [PawBackground, Navbar],
  templateUrl: './histoire.html',
  styleUrl: './histoire.scss',
})
export class Histoire {

}
