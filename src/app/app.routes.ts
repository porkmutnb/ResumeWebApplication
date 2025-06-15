import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'information', loadChildren: () => import('./information/information-module').then(m => m.InformationModule)
    },
    { path: '', redirectTo: 'information', pathMatch: 'full'},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
