import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'information', loadChildren: () => import('./information/information-module').then(m => m.InformationModule)
    },
    {
        path: 'portfolio', loadChildren: () => import('./portfolio/portfolio-module').then(m => m.PortfolioModule)
    },
    {
        path: 'special', loadChildren: () => import('./special/special-module').then(m => m.SpecialModule)
    },
    {
        path: 'backoffice', loadChildren: () => import('./backoffice/backoffice-module').then(m => m.BackofficeModule)
    },
    { path: '', redirectTo: 'information', pathMatch: 'full'},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
