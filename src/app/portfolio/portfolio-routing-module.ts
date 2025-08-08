import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Info } from './components/info/info';
import { Detail } from './components/detail/detail';

const routes: Routes = [
  { 
      path: '',
      component: Main,
      children: [
        { path: '', redirectTo: 'info', pathMatch: 'full' },
        { path: 'info', component: Info },
        { path: 'detail/:id', component: Detail }
      ]
    },
    { path: '**', redirectTo: 'portfolio/info' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
