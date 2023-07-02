import { Component,Input } from '@angular/core';
import { ApiUtilsService } from '../api-utils.service';


@Component({
  selector: 'app-avaialable-courses',
  templateUrl: './avaialable-courses.component.html',
  styleUrls: ['./avaialable-courses.component.css']
})
export class AvaialableCoursesComponent {
  @Input() id :any;
  isChecked: boolean = false;
  constructor(private apiUtil:ApiUtilsService){
  
  }

  checked(){
    if(this.isChecked){
      this.apiUtil.selectedCourse.push(this.id);
      console.log(this.id)
    }
    else {
      this.apiUtil.selectedCourse = this.apiUtil.selectedCourse.filter(item => item !== this.id);
      console.log(false)
    }
  }
  

}
