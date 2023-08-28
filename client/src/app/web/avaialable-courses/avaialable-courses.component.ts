import { Component, Input } from '@angular/core';
import { ApiUtilsService } from '../../api-utils.service';
import { StudentService } from 'src/app/shared/service/student.service';


@Component({
  selector: 'app-avaialable-courses',
  templateUrl: './avaialable-courses.component.html',
  styleUrls: ['./avaialable-courses.component.css']
})
export class AvaialableCoursesComponent {
  @Input() id: any;
  isChecked: boolean = false;
  constructor(private apiUtil: ApiUtilsService, private studentService: StudentService) {

  }

  checked() {
    if (this.isChecked) {
      this.studentService.selectedCourse.push(this.id);
    }
    else {
      this.studentService.selectedCourse = this.studentService.selectedCourse.filter(item => item !== this.id);

    }
  }


}
