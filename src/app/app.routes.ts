import { Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    {path: 'detail', component: DetailComponent},
    {path: 'header', component: HeaderComponent}
];
