import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnteprimaProfiloComponent } from './anteprima-profilo.component';

describe('AnteprimaProfiloComponent', () => {
  let component: AnteprimaProfiloComponent;
  let fixture: ComponentFixture<AnteprimaProfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnteprimaProfiloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnteprimaProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
