import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneiComponent } from './tornei.component';

describe('TorneiComponent', () => {
  let component: TorneiComponent;
  let fixture: ComponentFixture<TorneiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TorneiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TorneiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
