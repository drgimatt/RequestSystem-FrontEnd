import { Injectable } from '@angular/core';
import { Subjects } from '../model/subjects';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getSubject(id: number): Observable<Subjects> {
    return this.http.get<Subjects>(this.backendUrl + '/show-subject/' + id.toString());
  }

  public getSubjects(): Observable<Subjects[]> {
    return this.http.get<Subjects[]>(this.backendUrl + '/subjects');
  }

  public createSubject(formData: FormData) {
    return this.http.post<Subjects>(this.backendUrl + '/create-subject/', formData);
  }

  public updateSubject(id: number, formData: FormData) {
    return this.http.put<Subjects>(this.backendUrl + '/update-subject/' + id.toString(), formData);
  }

  public deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-subject/' + id.toString());
  }
}
