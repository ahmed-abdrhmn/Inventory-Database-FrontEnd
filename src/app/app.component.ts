import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';

import { DetailService, ServerDetailService } from './services/detail.service';
import { HeaderService, ServerHeaderService } from './services/header.service';
import { PackageService, ServerPackageService } from './services/package.service';
import { BranchService, ServerBranchService } from './services/branch.service';
import { ItemService, ServerItemService } from './services/item.service';

//I will register my services here so I have have a single instance in the whole app
//this is where we configure the dependency injection
const services = [
  {provide: DetailService, useClass: ServerDetailService},
  {provide: HeaderService, useClass: ServerHeaderService},
  {provide: PackageService, useClass: ServerPackageService},
  {provide: BranchService, useClass: ServerBranchService},
  {provide: ItemService, useClass: ServerItemService}
]


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, DetailComponent, HeaderComponent, MatToolbarModule, MatTabsModule],
  templateUrl: './app.component.html',
  providers: [services],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventory Documents';
  activeLink = 'detail';
}
