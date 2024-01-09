import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeHtmlPipeComponent } from './safe-html-pipe.component';

describe('SafeHtmlPipeComponent', () => {
  let component: SafeHtmlPipeComponent;
  let fixture: ComponentFixture<SafeHtmlPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SafeHtmlPipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SafeHtmlPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
