import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutteLePartiteComponent } from './tutte-le-partite.component';

describe('TutteLePartiteComponent', () => {
  let component: TutteLePartiteComponent;
  let fixture: ComponentFixture<TutteLePartiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutteLePartiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutteLePartiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
