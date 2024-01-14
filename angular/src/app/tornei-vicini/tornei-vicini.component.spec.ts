import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneiViciniComponent } from './tornei-vicini.component';

describe('TorneiViciniComponent', () => {
  let component: TorneiViciniComponent;
  let fixture: ComponentFixture<TorneiViciniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TorneiViciniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TorneiViciniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
