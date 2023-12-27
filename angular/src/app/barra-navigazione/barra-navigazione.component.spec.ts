import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNavigazioneComponent } from './barra-navigazione.component';

describe('BarraNavigazioneComponent', () => {
  let component: BarraNavigazioneComponent;
  let fixture: ComponentFixture<BarraNavigazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarraNavigazioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarraNavigazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
