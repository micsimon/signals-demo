import {Component, computed, effect, Signal, signal, WritableSignal} from '@angular/core';

@Component({
             selector: 'app-demo',
             standalone: true,
             imports: [],
             templateUrl: './demo.component.html',
             styleUrl: './demo.component.scss'
           })
export class DemoComponent {
  protected name: WritableSignal<string> = signal('John Doe');
  protected begruessung: Signal<string> = computed(() => `Hallo, ${this.name()}`);
  constructor() {
    this.name.set('Jane Doe');
    this.name.update((name) => name.toUpperCase());
    console.log(this.name());

    this.begruessung= computed(() =>{
      console.log('Begruessung wird berechnet');
      return `Hallo, ${this.name()}`}
    );
    setTimeout(()=>{
      this.name.set('Max Mustermann');
    }, 3000);

    const vorname = signal('Max');
    const nachname = signal('Mustermann');

    effect(() => {
      console.log('Begruessung hat sich geändert', `Hallo, ${vorname()} ${nachname()}`);
    });

    console.log('vorher');
    vorname.set('John');
    console.log('dazwischen');
    nachname.set('Doe');
    console.log('danach');
  }
}
