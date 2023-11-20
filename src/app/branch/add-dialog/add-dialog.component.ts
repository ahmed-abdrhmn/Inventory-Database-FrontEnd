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
import { BranchDialogData } from '../branch.dialog.data'

@Component({
  selector: 'app-branch-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css'
})
export class AddDialogComponent {
  public data!: BranchDialogData;
  
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>
  ){
      this.data = {
            name: null
        }
   }
}
