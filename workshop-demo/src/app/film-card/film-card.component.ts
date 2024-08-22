import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlinkDirective} from '../blink.directive';
import {Film} from '../workshop-demo/workshop-demo.component';

@Component({
             selector: 'app-film-card',
             standalone: true,
             imports: [],
             templateUrl: './film-card.component.html',
             styleUrl: './film-card.component.scss',
             hostDirectives: [BlinkDirective]
           })
export class FilmCardComponent {
  @Input() film!: Film;
  @Output() ratingChange = new EventEmitter<unknown>();
  @Output() selected = new EventEmitter<Film | null>();

}
