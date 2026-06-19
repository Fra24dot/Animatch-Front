import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ChatService } from '../../../core/services/chat.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PawBackground } from '../../../shared/components/paw-background/paw-background';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-chat',
  imports: [DatePipe, FormsModule, Navbar, PawBackground, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat implements OnInit {
  private readonly route = inject(ActivatedRoute);
  public readonly chatService = inject(ChatService);
  private readonly authService = inject(AuthService);

  public matchId = signal<string>('');
  public currentUserId = signal<string>('');
  public isAdopterRole = signal<boolean>(true); 
  public newMessageText = '';

  ngOnInit(): void {
    const currentUser = this.authService.connectedUser();
    
    if (currentUser && currentUser.sub) {
      this.currentUserId.set(currentUser.sub);
      this.isAdopterRole.set(currentUser.accountType === 'Adopter');
    }

    const id = this.route.snapshot.paramMap.get('matchId');
    if (id) {
      this.matchId.set(id);
      this.chatService.loadMessageHistory(id, this.currentUserId());
      this.chatService.startChatConnection(id);
    }
  }

  onSendMessage(): void {
    if (!this.newMessageText.trim() || !this.matchId()) return;

    this.chatService.sendMessage(
      this.matchId(),
      this.currentUserId(),
      this.newMessageText.trim(),
      this.isAdopterRole() 
    );

    this.newMessageText = ''; 
  }
}
