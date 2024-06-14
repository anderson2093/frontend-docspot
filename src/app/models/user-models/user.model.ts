import { Patient } from "../authentication-models/register.models";
import { Rol } from "../roles.models/rol.model";

export interface User {
    deletedAt:Date|string|null;
    idUser:string;
    email:string;
    password:string;
    active:boolean;
    roles:Rol[];
    patient:Patient;
}