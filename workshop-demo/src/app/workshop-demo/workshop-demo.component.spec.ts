import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopDemoComponent } from './workshop-demo.component';

describe('WorkshopDemoComponent', () => {
  let component: WorkshopDemoComponent;
  let fixture: ComponentFixture<WorkshopDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
