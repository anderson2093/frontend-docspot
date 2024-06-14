import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { specialty } from 'src/app/models/specialty-models/specialty,model';
import { ApiRoutes } from 'src/app/utils/config/api/api-routes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private properties;
  private appUrl:string;

  constructor(
    private http: HttpClient,
  ) { 
    this.properties = environment;
    this.appUrl = this.properties.url_api_render;
  }

public getSpecialties(): Observable<HttpResponse<specialty[]>> {
    const ctrl: string = ApiRoutes.specialties;
    return this.http.get<any>(`${this.appUrl}${ctrl}`,
      {observe: 'response'}
    );
  }
}
