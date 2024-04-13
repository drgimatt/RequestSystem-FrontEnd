import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(this.backendUrl + '/show-department/' + id.toString());
  }

  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.backendUrl + '/departments');
  }

  public createDepartment(formData: FormData) {
    return this.http.post<Department>(this.backendUrl + '/create-department/', formData);
  }

  public updateDepartment(id: number, formData: FormData) {
    return this.http.put<Department>(this.backendUrl + '/update-department/' + id.toString(), formData);
  }

  public deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-department/' + id.toString());
  }
}
