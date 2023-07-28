import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaialableCoursesComponent } from './avaialable-courses.component';

describe('AvaialableCoursesComponent', () => {
  let component: AvaialableCoursesComponent;
  let fixture: ComponentFixture<AvaialableCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvaialableCoursesComponent]
    });
    fixture = TestBed.createComponent(AvaialableCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
