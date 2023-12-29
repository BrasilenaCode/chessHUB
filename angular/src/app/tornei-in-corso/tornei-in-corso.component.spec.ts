import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneiInCorsoComponent } from './tornei-in-corso.component';

describe('TorneiInCorsoComponent', () => {
  let component: TorneiInCorsoComponent;
  let fixture: ComponentFixture<TorneiInCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TorneiInCorsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TorneiInCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
