import {Directive, DoCheck, ElementRef, inject} from '@angular/core';
import {BlinkService} from './blink.service';

@Directive()
export class BlinkableComponent implements DoCheck{
  public elementRef: ElementRef = inject(ElementRef);
  public blinkService: BlinkService = inject(BlinkService);

  private color: string = this.getRandomColor();

  public ngDoCheck(): void {
  }

  public blink(){
    if(!this.blinkService.showBlink) {
      return;
    }
    (this.elementRef.nativeElement as HTMLElement).animate([
                                                             {backgroundColor: this.color},
                                                             {backgroundColor: this.color},
                                                             {backgroundColor: this.color},
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
