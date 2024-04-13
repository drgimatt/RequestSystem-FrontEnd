import { Injectable } from '@angular/core';
import { AdvisingType } from '../model/advisingtype';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvisingtypeService {
  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getType(id: number): Observable<AdvisingType> {
    return this.http.get<AdvisingType>(this.backendUrl + '/show-type/' + id.toString());
  }

  public getTypes(): Observable<AdvisingType[]> {
    return this.http.get<AdvisingType[]>(this.backendUrl + '/types');
  }

  public createType(formData: FormData) {
    return this.http.post<AdvisingType>(this.backendUrl + '/create-type/', formData);
  }

  public updateType(id: number, formData: FormData) {
    return this.http.put<AdvisingType>(this.backendUrl + '/update-type/' + id.toString(), formData);
  }

  public deleteType(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-type/' + id.toString());
  }
}
