import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogDataDto } from 'src/app/models/components/common/dialog.model';

@Component({
  selector: 'app-dialog-alert',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-alert.component.html',
  styleUrl: './dialog-alert.component.scss'
})
export class DialogAlertComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataDto
  ) { }
}
