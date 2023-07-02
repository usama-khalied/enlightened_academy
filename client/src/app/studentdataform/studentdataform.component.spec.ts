import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdataformComponent } from './studentdataform.component';

describe('StudentdataformComponent', () => {
  let component: StudentdataformComponent;
  let fixture: ComponentFixture<StudentdataformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentdataformComponent]
    });
    fixture = TestBed.createComponent(StudentdataformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
