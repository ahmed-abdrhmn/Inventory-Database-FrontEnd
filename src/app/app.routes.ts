import { Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './header/header.component';
import { PackageComponent } from './package/package.component';
import { ItemComponent } from './item/item.component';
import { BranchComponent } from './branch/branch.component';

export const routes: Routes = [
    {path: 'detail', component: DetailComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'package', component: PackageComponent},
    {path: 'item', component: ItemComponent},
    {path: 'branch', component: BranchComponent}
];
