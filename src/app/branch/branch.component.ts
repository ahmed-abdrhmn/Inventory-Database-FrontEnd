import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchService } from '../services/branch.service';
import { Branch } from '../types/types';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { format } from 'date-fns'
import { MatDialog } from '@angular/material/dialog';

import { DelDialogComponent } from './del-dialog/del-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UpdateDialogComponent } from './upd-dialog/upd-dialog.component';

import { BranchDialogData } from './branch.dialog.data';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent implements OnInit{
  items: Branch[];

  public buttonDisable: boolean = false; //controls disabling of the all buttons

  constructor(
    public service: BranchService,
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

    this.buttonDisable = false; //dont forget to renable the buttons
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe(async (result: BranchDialogData | false) => { 
      if (result !== false) {
        await this.service.addItem(result);
        this.update();
      }
    });

  }

  async openUpdateDialog(id: number): Promise<void>{
    this.buttonDisable = true; //disable all buttons as a form of immediate feedback to the user
    
    const item: any = this.items.find(x => x.branchId == id)!; //the item to have its data modified
    
    //note: I didn't need to do this in the addDialog function since there, the form field is only used for input from the user.
    const dData: BranchDialogData = {name: item.name}

    this.buttonDisable = false; //dont forget to renable the buttons
    const dialogRef = this.dialog.open(UpdateDialogComponent,{data:dData});

    dialogRef.afterClosed().subscribe(async (result: BranchDialogData | false) => { 
      if (result !== false) {
        await this.service.updateItem(id, result);
        this.update();
      }
    });

  }
}
