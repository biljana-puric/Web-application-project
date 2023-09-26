import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyWebComponent } from './agency-web.component';

describe('AgencyWebComponent', () => {
  let component: AgencyWebComponent;
  let fixture: ComponentFixture<AgencyWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
