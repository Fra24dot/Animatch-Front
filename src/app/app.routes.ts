import { Routes } from '@angular/router';
import { RegisterShelter } from './features/auth/pages/register-shelter/register-shelter';
import { Welcome } from './features/auth/pages/welcome/welcome';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { RegisterUser } from './features/auth/pages/register-user/register-user';
import { UserProfileForm } from './features/profiles/user-profile-form/user-profile-form';

export const routes: Routes = [
    { path: '', component: Welcome },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'register-user', component: RegisterUser },
    { path: 'register-shelter', component: RegisterShelter },
    { path: 'user-profile-form', component: UserProfileForm },

    
    { path: '**', redirectTo: '' }
];
