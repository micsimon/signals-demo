import {AsyncPipe, JsonPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {BlinkDirective} from '../blink.directive';
import {FilmCardComponent} from '../film-card/film-card.component';
import {FilmDetailsComponent} from '../film-details/film-details.component';
import {LogDisplayComponent} from '../log-display/log-display.component';
import {LogService} from '../log.service';
import {RatingService} from '../rating.service';

@Component({
             selector: 'app-workshop-demo',
             standalone: true,
             imports: [
               JsonPipe,
               AsyncPipe,
               FilmCardComponent,
               FilmDetailsComponent,
               LogDisplayComponent
             ],
             templateUrl: './workshop-demo.component.html',
             styleUrl: './workshop-demo.component.scss',
             hostDirectives: [BlinkDirective]
           })
export class WorkshopDemoComponent {

  private _httpClient: HttpClient = inject(HttpClient);
  private _logService: LogService = inject(LogService);

  // protected movies$ = this._httpClient.get('http://swapi.dev/api/films');
  private _ratingService: RatingService = inject(RatingService);

  protected selectedFilm: Film | null = null;
  protected films: any[] = [];
  protected ratings: any = {};
  protected fimsWithRatings: any[] = [];

  public loadFilms(): void {
    this._httpClient.get<Response<Film>>('http://swapi.dev/api/films').subscribe((response: Response<Film>) => {
      this.films = response.results;
    });
  }

  public loadRatings(): void {
    this._ratingService.getRatings().subscribe((ratings) => {
      this.films = this.films.map((film) => {
        return {
          ...film,
          rating: ratings[film.url]
        }
      });
    });
  }

  public updateRating(id: any, $event: any): void {

  }

  public setSelectedFilm($event: Film | null): void {
    this.selectedFilm = $event;
    this._logService.log('View Details for ' + $event?.title);
  }
}

interface Response<T> {
  count: number;
  results: T[];
}

export interface Film {
  title: string;
  rating?: number;
}
