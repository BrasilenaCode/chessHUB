import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTorneoComponent } from './add-torneo.component';

describe('AddTorneoComponent', () => {
  let component: AddTorneoComponent;
  let fixture: ComponentFixture<AddTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTorneoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
