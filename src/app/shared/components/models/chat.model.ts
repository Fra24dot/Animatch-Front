export interface ChatMessage {
  id?: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  userId: string;
  shelterId: string;
  matchId: string;
  isFromUser: boolean;
}

export interface Conversation {
  matchId: string;
  dogId: string;
  dogName: string;
  dogPictureUrl?: string;
  interlocutorName: string; 
  lastMessageContent?: string;
  lastMessageCreatedAt?: Date;
  isLastMessageRead: boolean;
}