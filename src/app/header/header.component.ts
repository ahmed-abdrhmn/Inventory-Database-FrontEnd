import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../services/header.service';
import { InventoryInHeader } from '../types/types';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { format } from 'date-fns'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  items: InventoryInHeader[];
  format = format; //proxy memeber so I can use date-fmt's function in the template
  service: HeaderService;

  constructor(service: HeaderService){
      this.items = [];
      this.service = service;
  }

  ngOnInit(){
    this.service.getList().then((resp: any) => {
      this.items = resp;
    });
  }
}
