import {AsyncPipe, JsonPipe} from '@angular/common';
import {Component, computed, effect, inject, signal, Signal, WritableSignal} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {startWith} from 'rxjs';
import {BlinkableComponent} from '../blinkable.component';
import {FilmCardComponent} from '../film-card/film-card.component';
import {FilmDetailsComponent} from '../film-details/film-details.component';
import {FilmService} from '../film.service';
import {LogDisplayComponent} from '../log-display/log-display.component';
import {LogService} from '../log.service';
import {Film, Rating} from '../models';
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

  protected films: WritableSignal<Film[]> = signal([]);
  protected ratings: Signal<Rating | undefined> = toSignal(this._ratingService.ratings$.pipe(startWith({})));
  protected selectedFilm: WritableSignal<Film | null> = signal(null);

  protected avgRating: Signal<number | undefined> = computed(() => {
    const ratings = this.ratings() ?? {};
    return Object.values(ratings).reduce((acc, rating) => acc + rating, 0) / Object.keys(ratings).length;
  });

  constructor() {
    super();
    effect(() => {
      if (!this.selectedFilm()) {
        return;
      }
      this._logService.log('View Details for ' + this.selectedFilm()?.title);
    });
  }

  public loadFilms(): void {
    this._filmService.getFilms().subscribe((films: Film[]) => {
      this.films.set(films);
    });
  }

  public updateRating($event: any): void {
    this._ratingService.updateRating(this.selectedFilm()?.url as string, $event);
  }

  public setSelectedFilm($event: Film | null): void {
    this.selectedFilm.set($event);
  }
}

