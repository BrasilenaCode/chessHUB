import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoShowComponent } from './torneo-show.component';

describe('TorneoShowComponent', () => {
  let component: TorneoShowComponent;
  let fixture: ComponentFixture<TorneoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TorneoShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TorneoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
