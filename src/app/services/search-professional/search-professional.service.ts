import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Specialty } from 'src/app/models/authentication-models/register.models';
import { Professional } from 'src/app/models/search-professional-models/searchProfessional.model';

@Injectable({
  providedIn: 'root',
})
export class SearchProfessionalService {
  private professional = signal<Professional[]>([]);
  
  private proSubject = new BehaviorSubject<Professional[]>([]);

  constructor(private _http: HttpClient) {}

  // * Signals

  getProfessionalData(): Professional[] {
    return this.professional();
  }

  getProfessionalDataSub() {
    return this.proSubject.asObservable();
  }

  setProfessionalData(updatedData: Professional[]): void {
    this.professional.set(updatedData);
    this.proSubject.next([...updatedData]);
  }

  // ? HTTP Responses

  getSpecialties(): Observable<Specialty[]> {
    return this._http.get<Specialty[]>(`${environment.url_api}/api/specialty`);
  }

  /*getSpecialtyById(id: string):Observable<Specialty> {
    return this._http.get<Specialty>(`${environment.url_api}/api/specialty/${id}`);
  }*/

  getProfessionalsBySpecialtyId(id: string): Observable<Professional[]> {
    return this._http.get<Professional[]>(
      `${environment.url_api}/api/professional/list1/${id}`
    );
  }

  getProfessionals(): Observable<Professional[]> {
    return this._http.get<Professional[]>(
      `${environment.url_api}/api/professional`
    );
  }
}
