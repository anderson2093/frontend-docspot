import { Injectable } from '@angular/core';
import { DialogDataDto, DialogParams } from 'src/app/models/components/common/dialog.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAlertComponent } from 'src/app/views/common/dialogs/dialog-alert/dialog-alert.component';
import { DialogSuccessComponent } from 'src/app/views/common/dialogs/dialog-success/dialog-success.component';
import { DialogBaseComponent } from 'src/app/views/common/dialogs/dialog-base/dialog-base.component';
import { DialogLoadingComponent } from 'src/app/views/common/dialogs/dialog-loading/dialog-loading.component';
import { Observable } from 'rxjs';
import { ReservationDataDto } from 'src/app/models/reservation-models/reservationPopUpConfirm.model';
import { ReservationConfirmComponent } from 'src/app/views/pages/search-profesional/components/reservation-confirm/reservation-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private standardDialogParams: DialogParams = {
    width: 'auto',
    minWidth : '300px',
    height: 'auto',
    minHeight : '200px',
    hasBackdrop: true,
    backdropClass: '',
    disableClose: false,
  };
  
  constructor(
    public dialog: MatDialog
  ) { }

  /* componentes */
  public openAlertDialog(data: DialogDataDto, dialogParams?: DialogParams): Observable<any> {
    const dialogRef = this.dialog.open(
      DialogAlertComponent,
      this.setParams<DialogDataDto>('alertDialog', data, dialogParams)
    );

    return dialogRef.afterClosed();
  }

  public openSuccessDialog(data: DialogDataDto, dialogParams?: DialogParams): Observable<any> {
    const dialogRef = this.dialog.open(
      DialogSuccessComponent,
      this.setParams<DialogDataDto>('successDialog', data, dialogParams)
    );

    return dialogRef.afterClosed();
  }

  public openBaseDialog(data: DialogDataDto, dialogParams?: DialogParams): Observable<any> {
    const dialogRef = this.dialog.open(
      DialogBaseComponent,
      this.setParams<DialogDataDto>('baseDialog', data, dialogParams)
    );

    return dialogRef.afterClosed();
  }

  public openLoadingWindow(content?: string, tittle?: string) {
    this.dialog.open(DialogLoadingComponent, {
      id: 'loadingWindow',
      panelClass: ['loadingDialog'],
      width: '100%',
      maxWidth: '100%',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: {
        content: (content ?? 'Operación en proceso...'),
        tittle: tittle,
      },
    });
  }

  public closeDialog(id: string = 'loadingWindow') {
    this.dialog.getDialogById(id)?.close();
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }

  private setParams<T>(id: string, data: T, dialogParams: DialogParams | undefined): MatDialogConfig {
    const params: MatDialogConfig = {
      id: id,
      data: data,
      width: (dialogParams?.width) ? (dialogParams.width) : (this.standardDialogParams.width),
      minWidth: (dialogParams?.minWidth) ?
          (dialogParams.minWidth) : (this.standardDialogParams.minWidth),
      maxWidth: (dialogParams?.maxWidth) ? (dialogParams.maxWidth) : ('none'),
      height: (dialogParams?.height) ? (dialogParams.height) : (this.standardDialogParams.height),
      minHeight: (dialogParams?.minHeight) ?
          (dialogParams.minHeight) : (this.standardDialogParams.minHeight),
      maxHeight: (dialogParams?.maxHeight) ? (dialogParams.maxHeight) : ('none'),
      hasBackdrop: (dialogParams?.hasBackdrop) ?
          (dialogParams.hasBackdrop) : (this.standardDialogParams.hasBackdrop),
      backdropClass: (dialogParams?.backdropClass) ?
          (dialogParams.backdropClass) : (this.standardDialogParams.backdropClass),
      panelClass: (dialogParams?.panelClass) ?
          (dialogParams.panelClass) : (['blocked-dialog']),
      disableClose: (dialogParams?.disableClose) ?
          (dialogParams.disableClose) : (this.standardDialogParams.disableClose),
    };

    return params;
  }

  /* CUSTOM */
  public openReservationConfirm(data:ReservationDataDto, dialogParams?: DialogParams){
    const dialogRef = this.dialog.open(
      ReservationConfirmComponent,
      this.setParams<ReservationDataDto>('reservationConfirm', data, dialogParams)
    );
  }
}
