import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnteprimaTorneoComponent } from './anteprima-torneo.component';

describe('AnteprimaTorneoComponent', () => {
  let component: AnteprimaTorneoComponent;
  let fixture: ComponentFixture<AnteprimaTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnteprimaTorneoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnteprimaTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
