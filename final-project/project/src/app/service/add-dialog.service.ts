import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddDialogService {
  private actionSource = new BehaviorSubject<string>("");
  currentAction = this.actionSource.asObservable();

  constructor() { }
  changeAction(action: string) {
    this.actionSource.next(action);
  }
}
