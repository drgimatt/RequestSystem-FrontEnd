import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  requestsUrl: string = ' '

    constructor(private http: HttpClient){
        this.requestsUrl = 'http://localhost:18080/api'
    }

    public getRequests(): Observable<Request[]>{
        return this.http.get<Request[]> (this.requestsUrl + '/requests');
    }

    public getRequest(id: number): Observable<Request>{
        return this.http.get<Request>(this.requestsUrl + '/show-request/' + id.toString());
    }

    public getProfessorRequest(id: String): Observable<Request[]>{
        return this.http.get<Request[]>(this.requestsUrl + '/show-professor-requests/' + id);
    }

    public getGeneralizedRequests(query: String): Observable<Request[]>{
        return this.http.get<Request[]> (this.requestsUrl + '/requests-generalized/' + query);
      }

    public createRequest(formData: FormData)  {
        return this.http.post<any>(this.requestsUrl + '/create-request/', formData);
    }

    public updateRequest(id: number, formData: FormData) {
        return this.http.put<any>(this.requestsUrl + '/update-request/'+ id.toString(), formData);
    }

    public deleteRequest(id: number): Observable<void> {
        return this.http.delete<void>(this.requestsUrl + '/delete-request/' + id.toString());
      }

}
