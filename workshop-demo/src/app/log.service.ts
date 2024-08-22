import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LogService {
  public messages: string[] = [];

  log(message: string) {
    this.messages.push(message);
  }
}
