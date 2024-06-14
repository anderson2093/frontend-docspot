import { DialogActionsDataDto } from "../components/common/dialog.model";

export interface ReservationDataDto {
    tittle?:string;
    nameProfessional:string;
    namePatient:string;
    fecha:string;
    hour:string;
    priceProfessional:number;
    actions: DialogActionsDataDto[],
  }