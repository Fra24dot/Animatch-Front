import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/auth/auth-routing-module').then(m => m.routes)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
