import { Component } from '@angular/core';
import { Navbar} from '../../../../shared/components/navbar/navbar';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PawBackground } from '../../../../shared/components/paw-background/paw-background';

@Component({
  selector: 'app-welcome',
  imports: [Navbar, PawBackground, RouterLink ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  
}
