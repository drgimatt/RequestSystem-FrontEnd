import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(this.backendUrl + '/show-student/' + id.toString());
  }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.backendUrl + '/students');
  }

  public createStudent(formData: FormData) {
    return this.http.post<Student>(this.backendUrl + '/add-student/', formData);
  }

  public updateStudent(id: number, formData: FormData) {
    return this.http.put<Student>(this.backendUrl + '/update-student/' + id.toString(), formData);
  }

  public deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-student/' + id.toString());
  }
}
