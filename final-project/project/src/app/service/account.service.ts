import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountsUrl: string = ' '

  constructor(private http: HttpClient) {
    this.accountsUrl = 'http://localhost:18080/api'
  }

  public checkAccount(username : string, password : string) : Observable<Account> {
    return this.http.get<Account>(this.accountsUrl + '/users/' + username + '/' + password);
  }

  public getAccount(id: number): Observable<Account>{
    return this.http.get<Account>(this.accountsUrl + '/show-account/' + id.toString());
  }

  public createAccount(formData: FormData)  {
    return this.http.post<Account>(this.accountsUrl + '/create-account/', formData);
  }

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl + '/accounts');
  }

  public updateAccount(id: number, formData: FormData) {
    return this.http.put<Account>(this.accountsUrl + '/update-account/' + id.toString(), formData);
  }

  public deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(this.accountsUrl + '/delete-account/' + id.toString());
  }

  
}
