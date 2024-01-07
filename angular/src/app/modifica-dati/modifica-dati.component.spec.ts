import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaDatiComponent } from './modifica-dati.component';

describe('ModificaDatiComponent', () => {
  let component: ModificaDatiComponent;
  let fixture: ComponentFixture<ModificaDatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificaDatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaDatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
