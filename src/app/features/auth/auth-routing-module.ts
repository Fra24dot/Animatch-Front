import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Login} from './pages/login/login';
import { Register} from './pages/register/register';

const routes: Routes = [{ path: '', component: Welcome },
    { path: 'login', component: Login },
    { path: 'register', component: Register }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
