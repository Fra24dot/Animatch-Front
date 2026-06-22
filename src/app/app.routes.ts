import { Routes } from '@angular/router';
import { RegisterShelter } from './features/auth/pages/register-shelter/register-shelter';
import { Welcome } from './features/auth/pages/welcome/welcome';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { RegisterUser } from './features/auth/pages/register-user/register-user';
import { UserProfileForm } from './features/profiles/user-profile-form/user-profile-form';
import { AdminShelterValidation } from './features/profiles/admin-shelter-validation/admin-shelter-validation';
import { AddDog } from './features/profiles/add-dog/add-dog';
import { Preferences } from './features/profiles/preferences/preferences';
import { Feed } from './features/feed/feed';
import { AdopterLike } from './features/matches/adopter-like/adopter-like';
import { ShelterMatches } from './features/matches/shelter-matches/shelter-matches';
import { feedGuard } from './core/guards/feed-guard';
import { Conversation } from './features/messages/conversation/conversation';
import { Chat } from './features/messages/chat/chat';
import { Histoire } from './shared/components/histoire/histoire';
import { authGuard } from './core/guards/auth-guard';
import { UserDashboard } from './features/profiles/user-dashboard/user-dashboard';

export const routes: Routes = [
    { path: '', component: Welcome },
    { path: 'welcome', component: Welcome },

    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'register-user', component: RegisterUser },
    { path: 'register-shelter', component: RegisterShelter },
    { path: 'histoire', component: Histoire },
    { path: 'user-profile-form', component: UserProfileForm, canActivate: [authGuard] },
    { path: 'user-dashboard', component: UserDashboard, canActivate: [authGuard] },
    { path: 'preferences', component: Preferences, canActivate: [authGuard] },
    { path: 'admin-shelter-validation', component: AdminShelterValidation, canActivate: [authGuard] },
    { path: 'add-dog', component: AddDog, canActivate: [authGuard] },
    { path: 'adopter-like', component: AdopterLike, canActivate: [authGuard] },
    { path: 'shelter-matches', component: ShelterMatches, canActivate: [authGuard] },
    { path: 'messages', component: Conversation, canActivate: [authGuard] },
    { path: 'chat/:matchId', component: Chat, canActivate: [authGuard] },
    
    
    { path: 'feed', component: Feed },

    
    { path: '**', redirectTo: '' }
];
