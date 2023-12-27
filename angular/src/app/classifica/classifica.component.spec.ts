import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificaComponent } from './classifica.component';

describe('ClassificaComponent', () => {
  let component: ClassificaComponent;
  let fixture: ComponentFixture<ClassificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
