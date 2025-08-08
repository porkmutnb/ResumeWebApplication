import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Home } from './components/home/home';
import { Manage } from './components/manage/manage';
import { Login } from './components/login/login';
import { authGuard } from './service/auth-guard';

const routes: Routes = [
  { 
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'manage', component: Manage }
    ],
    canActivateChild: [authGuard]
  },
  { path: 'login', component: Login },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
