import { Injectable } from '@angular/core';
import { Status } from '../model/status';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getStatus(id: number): Observable<Status> {
    return this.http.get<Status>(this.backendUrl + '/show-status/' + id.toString());
  }

  public getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.backendUrl + '/status');
  }

  public createStatus(formData: FormData) {
    return this.http.post<Status>(this.backendUrl + '/create-status/', formData);
  }

  public updateStatus(id: number, formData: FormData) {
    return this.http.put<Status>(this.backendUrl + '/update-status/' + id.toString(), formData);
  }

  public deleteStatus(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-status/' + id.toString());
  }

}
