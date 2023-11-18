import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryInDetail, StaticDetailService } from './detail.service';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { format } from 'date-fns'

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [StaticDetailService],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  items: InventoryInDetail[];
  format = format; //proxy memeber so I can use date-fmt's function in the template


  constructor(service: StaticDetailService){
      this.items = [];

      service.getList().then((resp) => {
          this.items = resp;
      });
  }
}
