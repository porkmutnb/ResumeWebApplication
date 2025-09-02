import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Home } from './components/home/home';
import { Manage } from './components/manage/manage';
import { Login } from './components/login/login';
import { authGuard } from './service/auth-guard';
import { Profile } from './components/manage/profile/profile';
import { Experince } from './components/manage/experince/experince';
import { Education } from './components/manage/education/education';
import { Skill } from './components/manage/skill/skill';
import { Interest } from './components/manage/interest/interest';
import { Awardandcertificate } from './components/manage/awardandcertificate/awardandcertificate';
import { Resume } from './components/manage/resume/resume';
import { Portfolio } from './components/manage/portfolio/portfolio';

const routes: Routes = [
  { 
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { 
        path: 'manage', 
        component: Manage,
        children: [
          { path: '', component: Profile, pathMatch: 'full' },
          { path: 'interest', component: Interest },
          { path: 'experience', component: Experince },
          { path: 'education', component:  Education }, 
          { path: 'skills', component: Skill },
          { path: 'portfolio', component: Portfolio }, 
          { path: 'awardandcertificate', component: Awardandcertificate },
          { path: 'resume', component: Resume },
          { path: '**', redirectTo: '' }
        ]
      }
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
