import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailService } from '../services/detail.service';
import { InventoryInDetail } from '../types/types';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { format } from 'date-fns'
import { MatDialog } from '@angular/material/dialog';

import { DelDialogComponent } from './del-dialog/del-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UpdateDialogComponent } from './upd-dialog/upd-dialog.component';

import { DetailDialogData } from './detail.dialog.data';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  items: InventoryInDetail[]; //this name might be confusing with the items entity in our system...
  format = format; //proxy memeber so I can use date-fmt's function in the template

  public buttonDisable: boolean = false; //controls disabling of the all buttons

  constructor(public service: DetailService, public dialog: MatDialog){
      this.items = [];
      this.service = service;
  }

  ngOnInit(){
    this.update();
  }

  update(){
    this.service.getList().then((resp) => {
      this.items = resp;
    });
  }

  openDelDialog(id: number): void{
    const dialogRef = this.dialog.open(DelDialogComponent);

    dialogRef.afterClosed().subscribe(async (confirm: boolean) => { 
        if (confirm === true){
          await this.service.deleteItem(id);
          //update list
          this.update();
        }
    });

  }

  async openAddDialog(): Promise<void>{
    this.buttonDisable = true; //disable all buttons as a form of immediate feedback to the user
    
    const dData: DetailDialogData = { //dialog data
      lists: {
        headerIds: [1,2],
        itemIds: [1,2,3],
        packageIds: [1,2,3]
      }
    }

    this.buttonDisable = false; //dont forget to renable the buttons
    const dialogRef = this.dialog.open(AddDialogComponent,{data:dData});

    dialogRef.afterClosed().subscribe(async (result: DetailDialogData | false) => { 
      if (result !== false) {
        await this.service.addItem(result.form!);
        this.update();
      }
    });

  }

  async openUpdateDialog(id: number): Promise<void>{
    this.buttonDisable = true; //disable all buttons as a form of immediate feedback to the user
    
    const item: any = this.items.find(x => x.inventoryInDetailId == id)!; //the item to have its data modified

    //Creating a copy so that the expire date field doesn't affect this class's list
    const itemCopy: any = {};
    
    itemCopy.inventoryInHeaderId = item.inventoryInHeader.inventoryInHeaderId;
    itemCopy.serial = item.serial;
    itemCopy.itemId = item.item.itemId;
    itemCopy.packageId = item.package.packageId;
    itemCopy.batchNumber = item.batchNumber;
    itemCopy.serialNumber = item.serialNumber;
    itemCopy.expireDate = format(item.expireDate,'yyyy-MM-dd'); //it has to be this specific format for the date field to work
    itemCopy.quantity = item.quantity;
    itemCopy.consumerPrice = item.consumerPrice;
    
    //note: I didn't need to do this in the addDialog function since there, the form field is only used for input from the user.
    
    const dData: DetailDialogData = { //dialog data
      lists: {
        headerIds: [1,2],
        itemIds: [1,2,3],
        packageIds: [1,2,3]
      },
      form: itemCopy
    }

    this.buttonDisable = false; //dont forget to renable the buttons
    const dialogRef = this.dialog.open(UpdateDialogComponent,{data:dData});

    dialogRef.afterClosed().subscribe(async (result: DetailDialogData | false) => { 
      if (result !== false) {
        console.log(result.form?.expireDate);
        await this.service.updateItem(id, result.form!);
        this.update();
      }
    });

  }
}
