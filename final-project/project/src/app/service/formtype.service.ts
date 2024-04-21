import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formtype } from '../model/formtype';
;

@Injectable({
  providedIn: 'root'
})
export class FormtypeService {

  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getFormType(id: number): Observable<Formtype> {
    return this.http.get<Formtype>(this.backendUrl + '/show-formtype/' + id.toString());
  }

  public getFormTypes(): Observable<Formtype[]> {
    return this.http.get<Formtype[]>(this.backendUrl + '/formtypes');
  }

  public createFormType(formData: FormData) {
    return this.http.post<Formtype>(this.backendUrl + '/create-formtype/', formData);
  }

  public updateFormType(id: number, formData: FormData) {
    return this.http.put<Formtype>(this.backendUrl + '/update-formtype/' + id.toString(), formData);
  }

  public deleteFormType(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-formtype/' + id.toString());
  }
}
