import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { 
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
 } from '@angular/material/dialog';
import {  MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { ItemDialogData } from '../item.dialog.data'

@Component({
  selector: 'app-item-upd-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './upd-dialog.component.html',
  styleUrl: './upd-dialog.component.css'
})
export class UpdateDialogComponent {
  public data!: ItemDialogData;
  
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: ItemDialogData
  ){
      this.data = data
   }
}
