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
import { HeaderDialogData } from '../header.dialog.data'

@Component({
  selector: 'app-header-upd-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './upd-dialog.component.html',
  styleUrl: './upd-dialog.component.css'
})
export class UpdateDialogComponent {
  public data!: HeaderDialogData;
  
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: HeaderDialogData
  ){
      this.data = data
   }
}
