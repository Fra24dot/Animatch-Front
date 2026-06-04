import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { RouterLink } from '@angular/router';
import { PawBackground } from '../../../../shared/components/paw-background/paw-background';

@Component({
  selector: 'app-register',
  imports: [Navbar, PawBackground, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  
}
