import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloPubblicoComponent } from './profilo-pubblico.component';

describe('ProfiloPubblicoComponent', () => {
  let component: ProfiloPubblicoComponent;
  let fixture: ComponentFixture<ProfiloPubblicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfiloPubblicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfiloPubblicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
