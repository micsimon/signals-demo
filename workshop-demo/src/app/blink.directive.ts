import {Directive, DoCheck, ElementRef, inject} from '@angular/core';

@Directive({
             selector: '[appBlink]',
             standalone: true
           })
export class BlinkDirective implements DoCheck {
  public elementRef: ElementRef = inject(ElementRef);

  private color: string = this.getRandomColor();

  ngDoCheck(): void {
    (this.elementRef.nativeElement as HTMLElement).animate([
                                                             {backgroundColor: this.color},
                                                             {backgroundColor: "white"},
                                                           ], {
                                                             duration: 1000,
                                                           });
  }

  private getRandomColor(): string {
    const letters: string = "0123456789ABCDEF";
    let color: string = "#";
    for (let i: number = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
