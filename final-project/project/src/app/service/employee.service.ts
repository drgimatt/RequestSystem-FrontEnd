import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.backendUrl + '/show-employee/' + id.toString());
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.backendUrl + '/employees');
  }

  public createEmployee(formData: FormData) {
    return this.http.post<Employee>(this.backendUrl + '/create-employee/', formData);
  }

  public updateEmployee(id: number, formData: FormData) {
    return this.http.put<Employee>(this.backendUrl + '/update-employee/' + id.toString(), formData);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-employee/' + id.toString());
  }
}
