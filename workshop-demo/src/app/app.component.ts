import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BlinkDirective} from './blink.directive';
import {WorkshopDemoComponent} from './workshop-demo/workshop-demo.component';

@Component({
             selector: 'app-root',
             standalone: true,
             imports: [RouterOutlet, WorkshopDemoComponent],
             templateUrl: './app.component.html',
             styleUrl: './app.component.scss',
             hostDirectives: [BlinkDirective]
           })
export class AppComponent {
  title = 'workshop-demo';
}
