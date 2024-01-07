import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDiRicercaComponent } from './tab-di-ricerca.component';

describe('TabDiRicercaComponent', () => {
  let component: TabDiRicercaComponent;
  let fixture: ComponentFixture<TabDiRicercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabDiRicercaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabDiRicercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
