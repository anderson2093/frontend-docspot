import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogDataDto } from 'src/app/models/components/common/dialog.model';

@Component({
  selector: 'app-dialog-success',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-success.component.html',
  styleUrl: './dialog-success.component.scss'
})
export class DialogSuccessComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataDto
  ) { }
}
