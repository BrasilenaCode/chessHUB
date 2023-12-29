import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneiStatoComponent } from './tornei-stato.component';

describe('TorneiStatoComponent', () => {
  let component: TorneiStatoComponent;
  let fixture: ComponentFixture<TorneiStatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TorneiStatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TorneiStatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
