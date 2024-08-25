import {AsyncPipe, JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {BlinkableComponent} from '../blinkable.component';
import {LogService} from '../log.service';

@Component({
             selector: 'app-log-display',
             standalone: true,
             imports: [
               JsonPipe,
               AsyncPipe
             ],
             templateUrl: './log-display.component.html',
             styleUrl: './log-display.component.scss',
             changeDetection: ChangeDetectionStrategy.OnPush
           })
export class LogDisplayComponent extends BlinkableComponent {
  protected logService: LogService = inject(LogService);

}
