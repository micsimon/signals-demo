import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {BlinkableComponent} from './blinkable.component';
import {DemoComponent} from './demo/demo.component';
import {WorkshopDemoComponent} from './workshop-demo/workshop-demo.component';

@Component({
             selector: 'app-root',
             standalone: true,
             imports: [RouterOutlet, WorkshopDemoComponent, FormsModule, DemoComponent],
             templateUrl: './app.component.html',
             styleUrl: './app.component.scss',
           })
export class AppComponent extends BlinkableComponent{
  title = 'workshop-demo';
}
