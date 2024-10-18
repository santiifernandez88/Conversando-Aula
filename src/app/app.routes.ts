import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then( m => m.LoginComponent)
  },
  {
    path: 'chatA',
    loadComponent: () => import('./chat-dos/chat-dos.component').then( m => m.ChatDosComponent)
  },
  {
    path: 'chatB',
    loadComponent: () => import('./chat-uno/chat-uno.component').then( m => m.ChatUnoComponent)
  },
];
