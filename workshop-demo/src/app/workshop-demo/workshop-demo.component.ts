import {AsyncPipe, JsonPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BlinkableComponent} from '../blinkable.component';
import {FilmCardComponent} from '../film-card/film-card.component';
import {FilmDetailsComponent} from '../film-details/film-details.component';
import {FilmService} from '../film.service';
import {LogDisplayComponent} from '../log-display/log-display.component';
import {LogService} from '../log.service';
import {Film} from '../models';
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
           })
export class WorkshopDemoComponent extends BlinkableComponent {

  private _logService: LogService = inject(LogService);
  private _ratingService: RatingService = inject(RatingService);
  private _filmService: FilmService = inject(FilmService);

  protected selectedFilm: Film | null = null;
  protected ratings: { [key: string]: number } = {};
  protected films: Film[] = [];

  constructor() {
    super();
    this._ratingService.ratings$.pipe(
      takeUntilDestroyed()
    ).subscribe((ratings) => {
      this.ratings = ratings;
      this.applyRatings();
    });
  }

  public loadFilms(): void {
    this._filmService.getFilms().subscribe((films: Film[]) => {
      this.films = films;
      this.applyRatings();
    });
  }

  public applyRatings() {
    this.films = this.films.map((film) => {
      return {
        ...film,
        rating: this.ratings[film.url]
      }
    });
  }

  public updateRating($event: any): void {
    this._ratingService.updateRating(this.selectedFilm?.url as string, $event);
  }

  public setSelectedFilm($event: Film | null): void {
    this.selectedFilm = $event;
    this._logService.log('View Details for ' + $event?.title);
  }
}

