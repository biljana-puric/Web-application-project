import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestingJobComponent } from './requesting-job.component';

describe('RequestingJobComponent', () => {
  let component: RequestingJobComponent;
  let fixture: ComponentFixture<RequestingJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestingJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestingJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
