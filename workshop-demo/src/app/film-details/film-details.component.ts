import {Component, Input} from '@angular/core';
import {BlinkDirective} from '../blink.directive';
import {Film} from '../workshop-demo/workshop-demo.component';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss',
             hostDirectives: [BlinkDirective]
})
export class FilmDetailsComponent {
  @Input() film!: Film;

}
