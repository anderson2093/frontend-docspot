export interface Professional {
  idProfessional: string;
  nameProfessional: string;
  reputation: number;
  valueQuery: number;
  mp: string;
  nameSpecialty: string;
  urlPhoto: string;
  idSpecialty?: string;
}

export interface Specialty {
  idSpecialty: string;
  nameSpecialty: string;
  descriptionSpecialty: string;
}
