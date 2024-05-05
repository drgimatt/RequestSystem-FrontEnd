import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  requestsUrl: string;

    constructor(private http: HttpClient){
        this.requestsUrl = 'http://localhost:18080/api'
    }

    public getAllNotifications(): Observable<Notification[]>{
      return this.http.get<Notification[]> (this.requestsUrl + '/notifications');
    }  

    public getUserNotifications(id: String): Observable<Notification[]>{
      return this.http.get<Notification[]> (this.requestsUrl + '/notifications/' + id);
    }  

    public getGeneralizedNotifications(query: String): Observable<Notification[]>{
      return this.http.get<Notification[]> (this.requestsUrl + '/notifications-generalized/' + query);
    }

    public createNotification(notification : Notification)  {
      return this.http.post<any>(this.requestsUrl + '/create-notification/', notification);
    }

    public updateNotification(id: number, notification : Notification)  {
      return this.http.post<any>(this.requestsUrl + '/update-notification/' + id.toString(), notification);
    }

    public deleteRequest(id: number): Observable<void> {
      return this.http.delete<void>(this.requestsUrl + '/delete-notification/' + id.toString());
    }

}
