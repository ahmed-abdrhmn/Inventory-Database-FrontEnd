import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../services/header.service';
import { BranchService } from '../services/branch.service';
import { InventoryInHeader } from '../types/types';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { format } from 'date-fns'
import { MatDialog } from '@angular/material/dialog';

import { DelDialogComponent } from './del-dialog/del-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UpdateDialogComponent } from './upd-dialog/upd-dialog.component';

import { HeaderDialogData } from './header.dialog.data';

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
  
  public buttonDisable: boolean = false; //controls disabling of the all buttons

  constructor(
    public service: HeaderService,
    public branchservice: BranchService,
    public dialog: MatDialog
  ){
      this.items = [];
      this.service = service;
  }

  ngOnInit(){
    this.service.getList().then((resp: any) => {
      this.items = resp;
    });
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
    
    const dData: HeaderDialogData = { //dialog data
      lists: {
        branchIds: (await this.branchservice.getList()).map(x => x.branchId)
      }
    }

    this.buttonDisable = false; //dont forget to renable the buttons
    const dialogRef = this.dialog.open(AddDialogComponent,{data:dData});

    dialogRef.afterClosed().subscribe(async (result: HeaderDialogData | false) => { 
      if (result !== false) {
        await this.service.addItem(result.form!);
        this.update();
      }
    });

  }

  async openUpdateDialog(id: number): Promise<void>{
    this.buttonDisable = true; //disable all buttons as a form of immediate feedback to the user
    
    const item: any = this.items.find(x => x.inventoryInHeaderId == id)!; //the item to have its data modified

    //Creating a copy so that the docDate date field doesn't affect this class's list
    const itemCopy: any = {};
    
    itemCopy.branchId = item.branch.branchId;
    itemCopy.docDate = format(item.docDate,'yyyy-MM-dd'); //it has to be this specific format for the date field to work
    itemCopy.reference = item.reference;
    itemCopy.remarks = item.remarks;
    
    //note: I didn't need to do this in the addDialog function since there, the form field is only used for input from the user.
    const dData: HeaderDialogData = { //dialog data
      lists: {
        branchIds: (await this.branchservice.getList()).map(x => x.branchId)
      },
      form: itemCopy
    }

    this.buttonDisable = false; //dont forget to renable the buttons
    const dialogRef = this.dialog.open(UpdateDialogComponent,{data:dData});

    dialogRef.afterClosed().subscribe(async (result: HeaderDialogData | false) => { 
      if (result !== false) {
        await this.service.updateItem(id, result.form!);
        this.update();
      }
    });

  }
}
