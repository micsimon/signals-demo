import {Component, computed, effect, Signal, signal, WritableSignal} from '@angular/core';

@Component({
             selector: 'app-demo',
             standalone: true,
             imports: [],
             templateUrl: './demo.component.html',
             styleUrl: './demo.component.scss'
           })
export class DemoComponent {
  constructor() {
    // Signal erstellen
    const name: WritableSignal<string> = signal('Moritz');
    const nachName: WritableSignal<string> = signal('Schulze');
    // Setzen über set-Methode
    name.set('Hagen');
    // Setzen über update-Methode
    name.update((currentValue: string) => 'Thomas');
    // Lesen
    console.log(name());

    // Computed erstellen
    const begruessung: Signal<string> = computed(() => {
      return `Hallo ${name()} ${nachName()}!`
    });

    // Effect erstellen
    effect(() => {
      console.log(begruessung())
    });

    name.set('Hagen');
    nachName.set('Strahl');

  }
}
