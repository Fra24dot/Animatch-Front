import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Login} from './pages/login/login';
import { Register} from './pages/register/register';
import { RegisterUser } from './pages/register-user/register-user';
import { RegisterShelter } from './pages/register-shelter/register-shelter';


export const routes: Routes = [
    { path: '', component: Welcome },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'register-user', component: RegisterUser },
    { path: 'register-shelter', component: RegisterShelter }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }