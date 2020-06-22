import { Component, OnInit } from '@angular/core';
import { CourseService } from '@app/share/service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses: Array<Object>;

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.courseService.getCourseItems({
      'contentTypeId' : 25,
      'arrange' : 'P'
    }).subscribe(data => {
      this.courses = data.response.body.items.item;
      console.log('[this.courses]', this.courses);
    })
  }

}
