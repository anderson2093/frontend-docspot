import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registerPatient, registerProfessional } from 'src/app/models/authentication-models/register.models';
import { ApiRoutes } from 'src/app/utils/config/api/api-routes';
import { environment } from 'src/environments/environment';

interface registerPatientAny {
  [key: string]: any; // Allows any string key and any value
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private properties;
  private appUrl:string;

  constructor(
    private http: HttpClient,
  ) { 
    this.properties = environment;
    this.appUrl = this.properties.url_api_render;
  }

  public registerPatient(patient:registerPatient): Observable<HttpResponse<any>> {
    const ctrl: string = ApiRoutes.register;
    const newPatient:registerPatientAny = patient as registerPatientAny;
    const params = new URLSearchParams();

    /*
     for (const key in Object.keys(newPatient)) {
       if (newPatient.hasOwnProperty(key)) {
           params.append(key, newPatient[key]);
       }
     }
    */
    params.append("email", patient.email);
    params.append("password", patient.password);
    params.append("nameRole", patient.nameRole);
    params.append("nameUser", patient.nameUser);
    params.append("cellphonePatient", patient.cellphonePatient);
    params.append("hasSocialWork", patient.hasSocialWork ? 'true':'false');
    params.append("socialWork", '');
    params.append("photoPatient", '');
    // params.append("hasSocialWork", patient.hasSocialWork ? 'true':'false');
    // params.append("socialWork", patient.socialWork);
    // params.append("photoPatient", patient.photoPatient);

    // console.log("data codificada:", params);
    // console.log("data url:", params.toString());
  

    return this.http.post<any>(`${this.appUrl}${ctrl}`, params,
        {
          observe: 'response',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
    );
  }

  public registerProfessional(profesional:registerProfessional): Observable<HttpResponse<any>> {
    const ctrl: string = ApiRoutes.register;
    const params = new URLSearchParams();

    let strSpecialties:string = profesional.specialties.join(',');

    params.append("email", profesional.email);
    params.append("password", profesional.password);
    params.append("nameRole", profesional.nameRole);
    params.append("nameUser", profesional.nameUser);
    params.append("mp", profesional.mp);
    params.append("valueQuery", profesional.valueQuery);
    params.append("specialty1", profesional.specialties[0] ?? "");
    params.append("specialty2", profesional.specialties[1] ?? "");
  
    return this.http.post<any>(`${this.appUrl}${ctrl}`, params,
        {
          observe: 'response',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
    );
  }
  
}

// export interface registerPatient {
//   email:string;
//   password:string;
//   nameRole:string;
//   nameUser:string;
//   cellphonePatient:string;
//   photoPatient:string;
//   hasSocialWork:boolean;
//   socialWork:string;
// }
