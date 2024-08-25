import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlinkableComponent} from '../blinkable.component';
import {Film} from '../models';

@Component({
             selector: 'app-film-card',
             standalone: true,
             imports: [],
             templateUrl: './film-card.component.html',
             styleUrl: './film-card.component.scss',
           })
export class FilmCardComponent extends BlinkableComponent {
  @Input() film!: Film;
  @Output() selected = new EventEmitter<Film | null>();
}
