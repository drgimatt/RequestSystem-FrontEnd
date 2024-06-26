import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Dog } from '../model/dog'
import { Injectable } from '@angular/core'

@Injectable ({providedIn:'root'})
export class DogService {
    dogsUrl: string = ' '

    constructor(private http: HttpClient){
        this.dogsUrl = 'http://localhost:18080/api'
    }

    public getDogs(): Observable<Dog[]>{
        return this.http.get<Dog[]> (this.dogsUrl + '/dogs');
    }

    public getDog(id: number): Observable<Dog>{
        return this.http.get<Dog>(this.dogsUrl + '/show-dog/' + id.toString());
    }

    public addDog(formData: FormData)  {
        return this.http.post<any>(this.dogsUrl + '/add-dog/', formData);
    }
 
    public updateDog(id: number, formData: FormData) {
        return this.http.put<any>(this.dogsUrl + '/update-dog/'+ id.toString(), formData);
    }
    
    public deleteDog(id: number): Observable<void> {
        return this.http.delete<void>(this.dogsUrl + '/delete-dog/' + id.toString());
      }
      
      
}
