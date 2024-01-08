import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaPgnComponent } from './crea-pgn.component';

describe('CreaPgnComponent', () => {
  let component: CreaPgnComponent;
  let fixture: ComponentFixture<CreaPgnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaPgnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaPgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
