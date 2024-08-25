import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LogService {

  public a: string[] = [];
  private readonly messageSubect: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly messages$: Observable<string[]> = this.messageSubect.asObservable();

  log(message: string) {
    this.messageSubect.next([...this.messageSubect.value, message]);
  }
}
