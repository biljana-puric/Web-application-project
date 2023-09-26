import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsForAgenciesComponent } from './jobs-for-agencies.component';

describe('JobsForAgenciesComponent', () => {
  let component: JobsForAgenciesComponent;
  let fixture: ComponentFixture<JobsForAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsForAgenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsForAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
