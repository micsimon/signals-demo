import {JsonPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {BlinkDirective} from '../blink.directive';
import {LogService} from '../log.service';

@Component({
  selector: 'app-log-display',
  standalone: true,
             imports: [
               JsonPipe
             ],
  templateUrl: './log-display.component.html',
  styleUrl: './log-display.component.scss',
             hostDirectives: [BlinkDirective]
})
export class LogDisplayComponent {
  protected logService: LogService = inject(LogService);

}
