import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseShift } from 'src/app/models/shitf-models/shift.model';
import { ApiRoutes } from 'src/app/utils/config/api/api-routes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private properties;
  private appUrl:string;

  constructor(
    private http: HttpClient,
  ) { 
    this.properties = environment;
    this.appUrl = this.properties.url_api;
  }

  public getShitfByProfessionalId(id:string, date:string): Observable<HttpResponse<ResponseShift[]>> {
    const ctrl: string = `${ApiRoutes.shifts}/${id}`;
    let params = new HttpParams().set('localDate', date);
    return this.http.get<any>(`${this.appUrl}${ctrl}`,
      {observe: 'response', params: params}
    );
  }

}
