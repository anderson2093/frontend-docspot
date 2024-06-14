import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DialogDataDto } from 'src/app/models/components/common/dialog.model';

@Component({
  selector: 'app-dialog-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
  ],
  templateUrl: './dialog-loading.component.html',
  styleUrl: './dialog-loading.component.scss'
})
export class DialogLoadingComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogLoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataDto
  ) { }
}
