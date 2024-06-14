export interface DialogDataDto {
    tittle?: string,
    content?: string,
    actions: DialogActionsDataDto[],
}

export interface DialogLoadingDto {
    tittle?: string,
    content?: string,
}

export interface DialogActionsDataDto {
    name: string,
    returnValue?: any,
    style?: string,
}

export interface DialogParams {
    width?: string,
    minWidth?: string,
    maxWidth?: string,
    height?: string,
    minHeight?: string,
    maxHeight?: string,
    hasBackdrop?: boolean,
    backdropClass?: string,
    panelClass?: string[],
    disableClose?: boolean,
}