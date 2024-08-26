import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {BlinkableComponent} from './blinkable.component';
import {WorkshopDemoComponent} from './workshop-demo/workshop-demo.component';

@Component({
             selector: 'app-root',
             standalone: true,
             imports: [RouterOutlet, WorkshopDemoComponent, FormsModule],
             templateUrl: './app.component.html',
             styleUrl: './app.component.scss',
           })
export class AppComponent extends BlinkableComponent{
  title = 'workshop-demo';
}
