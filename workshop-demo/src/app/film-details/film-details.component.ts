import {ChangeDetectionStrategy, Component, effect, input, InputSignal, OutputRef} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';
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
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class FilmDetailsComponent extends BlinkableComponent {
  protected fc: FormControl = new FormControl();

  rating: InputSignal<number | undefined> = input<number>();
  film: InputSignal<Film | null | undefined> = input<Film | null>();
  ratingChange: OutputRef<any> = outputFromObservable(this.fc.valueChanges);

  constructor() {
    super();
    effect(() => {
      this.fc.setValue(this.rating(), {emitEvent: false});
    });
  }
}
