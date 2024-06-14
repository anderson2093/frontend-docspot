import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/models/authentication-models/login-response.model';
import { userLogin } from 'src/app/models/authentication-models/login.models';
import { ApiRoutes } from 'src/app/utils/config/api/api-routes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthV1Service {
  private properties;
  private appUrl: string;

  constructor(private http: HttpClient) {
    this.properties = environment;
    this.appUrl = this.properties.url_api_render;
  }

  public login(user: userLogin): Observable<HttpResponse<LoginResponse>> {
    const ctrl: string = ApiRoutes.login;
    return this.http.post<LoginResponse>(`${this.appUrl}${ctrl}`, user, {
      observe: 'response',
    });
  }

  public decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  public getUserData(email: string | null): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token')
    const ctrl: string = `/api/auth/user/${email}`;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.appUrl}${ctrl}`, {
      headers,
      observe: 'response',
    });
  }
}
