import {Injectable} from '@angular/core';

@Injectable({
              providedIn: 'root'
            })
export class BlinkService {
  public showBlink: boolean = false;
}
