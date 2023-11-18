import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryInHeader, StaticHeaderService } from './header.service';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { format } from 'date-fns'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [StaticHeaderService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  items: InventoryInHeader[];
  format = format; //proxy memeber so I can use date-fmt's function in the template
  service: StaticHeaderService;

  constructor(service: StaticHeaderService){
      this.items = [];
      this.service = service;
  }

  ngOnInit(){
    this.service.getList().then((resp) => {
      this.items = resp;
    });
  }
}
