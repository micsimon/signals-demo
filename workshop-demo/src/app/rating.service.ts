import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RatingService {

  getRatings(): Observable<{ [key: string]: number }> {
    return of({
                'https://swapi.dev/api/films/1/': 5,
              }).pipe(
      delay(1000)
    )

  }
}
