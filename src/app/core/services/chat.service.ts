import { Injectable, inject, DestroyRef, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ChatMessage, Conversation } from "../../shared/components/models/chat.model";
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private hubConnection!: signalR.HubConnection;
  private readonly apiUrl = `${environment.apiUrl}/messages`; 

  public conversations = signal<Conversation[]>([]); 
  public activeMessages = signal<ChatMessage[]>([]);  
  public isConnected = signal<boolean>(false);

//Récupère la liste globale des conversations (HTTP)
  
  public loadConversations(id: string, isUser: boolean): void {
    const rolePath = isUser ? 'user' : 'shelter';
    
    this.http.get<Conversation[]>(`${this.apiUrl}/conversations/${rolePath}/${id}`).subscribe({
      next: (list: Conversation[]) => this.conversations.set(list),
      error: (err: any) => console.error('Erreur chargement conversations:', err)
    });
  }

  
   //Charge l'historique d'un chat spécifique (HTTP)
  
  public loadMessageHistory(matchId: string, currentUserId: string): void {
    // On passe le currentUserId en QueryParam comme attendu par le contrôleur C#
    this.http.get<ChatMessage[]>(`${this.apiUrl}/history/${matchId}?currentUserId=${currentUserId}`).subscribe({
      next: (history: ChatMessage[]) => this.activeMessages.set(history),
      error: (err: any) => console.error('Impossible de charger l\'historique:', err)
    });
  }

  // Lance la connexion WebSocket (SignalR)
  public startChatConnection(matchId: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalRUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.isConnected.set(true);
        console.log('Connecté au Hub SignalR ! 🐾');
        this.hubConnection.invoke('JoinChat', matchId);
      })
      .catch((err: any) => console.error('Erreur SignalR:', err));

    // Écoute des messages en direct
    this.hubConnection.on('ReceiveMessage', (newMessage: any) => {
      //On ajoute le message dans le chat actif
      this.activeMessages.update(messages => [...messages, newMessage]);

      // On met à jour l'aperçu dans la liste des conversations de gauche
      this.conversations.update(list => 
        list.map(c => c.matchId === newMessage.matchId 
          ? { ...c, lastMessageContent: newMessage.content, lastMessageCreatedAt: newMessage.createdAt }
          : c
        )
      );
    });

    this.destroyRef.onDestroy(() => this.stopChatConnection());
  }

 // Envoie un message (SignalR)
 
  public sendMessage(matchId: string, senderId: string, text: string, isFromUser: boolean): void {
    if (!this.isConnected()) return;

    this.hubConnection.invoke('SendMessage', matchId, senderId, text, isFromUser)
      .catch((err: any) => console.error('Erreur envoi message:', err));
  }

  public stopChatConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {
        this.isConnected.set(false);
        this.activeMessages.set([]);
      });
    }
  }
}