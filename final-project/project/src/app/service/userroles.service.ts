import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../model/userrole';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserrolesService {
  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getRole(id: number): Observable<UserRole> {
    return this.http.get<UserRole>(this.backendUrl + '/show-role/' + id.toString());
  }

  public getRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(this.backendUrl + '/roles');
  }

  public createRole(formData: FormData) {
    return this.http.post<UserRole>(this.backendUrl + '/create-role/', formData);
  }

  public updateRole(id: number, formData: FormData) {
    return this.http.put<UserRole>(this.backendUrl + '/update-role/' + id.toString(), formData);
  }

  public deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-role/' + id.toString());
  }


}
