import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartitaComponent } from './add-partita.component';

describe('AddPartitaComponent', () => {
  let component: AddPartitaComponent;
  let fixture: ComponentFixture<AddPartitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPartitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPartitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
