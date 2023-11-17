import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryInDetail, DetailService } from './detail.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  providers: [DetailService],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  title: string = "Inventory Documents";

  items: InventoryInDetail[];

  constructor(service: DetailService){
      this.items = [];

      service.getList().then((resp) => {
          this.items = resp;
      });
  }
}
