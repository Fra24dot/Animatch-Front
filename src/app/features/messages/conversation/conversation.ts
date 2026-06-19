import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { PawBackground } from '../../../shared/components/paw-background/paw-background';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-conversation',
  imports: [Navbar, PawBackground,DatePipe],
  templateUrl: './conversation.html',
  styleUrl: './conversation.scss',
})
export class Conversation implements OnInit {
  public readonly chatService = inject(ChatService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const currentUser = this.authService.connectedUser();
    
    if (currentUser && currentUser.sub) {
      const isAdopter = currentUser.accountType === 'Adopter'; 
      this.chatService.loadConversations(currentUser.sub, isAdopter);
    }
  }

  goToChat(matchId: string): void {
    this.router.navigate(['/chat', matchId]);
  }
}
