import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservDto } from 'src/app/models/reservation-models/reservation.mode';
import { ApiRoutes } from 'src/app/utils/config/api/api-routes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private properties;
  private appUrl:string;

  constructor(
    private http: HttpClient,
  ) { 
    this.properties = environment;
    this.appUrl = this.properties.url_api;
  }

  public postReservation(reservationDto:ReservDto): Observable<HttpResponse<any>> {
    const ctrl: string = `${ApiRoutes.reservations}`;

    let data:any = reservationDto;
    return this.http.post<any>(`${this.appUrl}${ctrl}`, data,
      {observe: 'response'}
    );
  }
}
