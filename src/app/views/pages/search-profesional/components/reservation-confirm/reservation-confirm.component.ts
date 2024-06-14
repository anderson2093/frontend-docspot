import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogActionsDataDto } from 'src/app/models/components/common/dialog.model';
import { ReservationDataDto } from 'src/app/models/reservation-models/reservationPopUpConfirm.model';

@Component({
  selector: 'app-reservation-confirm',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './reservation-confirm.component.html',
  styleUrl: './reservation-confirm.component.scss'
})
export class ReservationConfirmComponent {
  constructor(
  public dialogRef: MatDialogRef<ReservationConfirmComponent>,
  @Inject(MAT_DIALOG_DATA) public data: ReservationDataDto
  ){}
}
