import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { 
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
 } from '@angular/material/dialog';

@Component({
  selector: 'app-branch-del-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './del-dialog.component.html',
  styleUrl: './del-dialog.component.css'
})
export class DelDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DelDialogComponent>
  ){ }
}
