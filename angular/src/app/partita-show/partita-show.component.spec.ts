import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitaShowComponent } from './partita-show.component';

describe('PartitaShowComponent', () => {
  let component: PartitaShowComponent;
  let fixture: ComponentFixture<PartitaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartitaShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartitaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
