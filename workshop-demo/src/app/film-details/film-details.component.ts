import {Component, EventEmitter, Input, Output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {BlinkableComponent} from '../blinkable.component';
import {Film} from '../models';

@Component({
  selector: 'app-film-details',
  standalone: true,
             imports: [
               ReactiveFormsModule
             ],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss',
})
export class FilmDetailsComponent extends BlinkableComponent {
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  protected fc: FormControl = new FormControl();

  constructor() {
    super();
    this.fc.valueChanges.pipe(
      takeUntilDestroyed(),
    ).subscribe((value) => {
      this.ratingChange.emit(value);
    });
  }

  private _film!: Film;

  public get film(): Film {
    return this._film;
  }

  @Input() set film(value: Film) {
    this._film = value;
    this.fc.setValue(value.rating);
  }

}
