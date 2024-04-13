import { Injectable } from '@angular/core';
import { Priority } from '../model/priority';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  backendUrl: string = ' '
  constructor(private http: HttpClient) {
    this.backendUrl = 'http://localhost:18080/api'
  }

  public getPriority(id: number): Observable<Priority> {
    return this.http.get<Priority>(this.backendUrl + '/show-priority/' + id.toString());
  }

  public getPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(this.backendUrl + '/priorities');
  }

  public createPriority(formData: FormData) {
    return this.http.post<Priority>(this.backendUrl + '/create-priority/', formData);
  }

  public updatePriority(id: number, formData: FormData) {
    return this.http.put<Priority>(this.backendUrl + '/update-priority/' + id.toString(), formData);
  }

  public deletePriority(id: number): Observable<void> {
    return this.http.delete<void>(this.backendUrl + '/delete-priority/' + id.toString());
  }
}
