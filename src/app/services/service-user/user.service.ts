import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from 'src/app/utils/config/api/api-routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private properties;
  private appUrl:string;

  constructor(
    private http: HttpClient,
  ) { 
    this.properties = environment;
    this.appUrl = this.properties.url_api;
  }

public getUserByEmail(email:string): Observable<HttpResponse<any>> {
    const ctrl: string = `${ApiRoutes.user}/${email}`;
    return this.http.get<any>(`${this.appUrl}${ctrl}`,
      {observe: 'response'}
    );
  }
}
