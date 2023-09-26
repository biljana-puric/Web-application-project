import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesMenuComponent } from './agencies-menu.component';

describe('AgenciesMenuComponent', () => {
  let component: AgenciesMenuComponent;
  let fixture: ComponentFixture<AgenciesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenciesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenciesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
