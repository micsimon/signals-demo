import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RatingService {

  private ratingsSubject: BehaviorSubject<{ [key: string]: number }> = new BehaviorSubject<{ [p: string]: number }>({});
  public ratings$: Observable<{ [key: string]: number }> = this.ratingsSubject.asObservable();

  constructor() {
    localStorage.getItem('ratings') ? this.ratingsSubject.next(JSON.parse(localStorage.getItem('ratings') as string)) : this.ratingsSubject.next({});
  }

  public updateRating(filmUrl: string, rating: number): void {
    const ratings = this.ratingsSubject.getValue();
    ratings[filmUrl] = rating;
    this.ratingsSubject.next(ratings);
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }
}
