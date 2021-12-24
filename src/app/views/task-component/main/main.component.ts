import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RequestType } from 'src/app/core/models/student/request-type';
import { UserToken } from 'src/app/core/models/student/student';
import { StudentTask } from 'src/app/core/models/student/student-task';
import { AuthService } from 'src/app/core/services/auth.service';
import { RequestTypeService } from 'src/app/core/services/request-type.service';
import { StudentTaskService } from 'src/app/core/services/student-task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  student: UserToken = new UserToken();
  stuentTasks: StudentTask[] = [];

  constructor(private _auth: AuthService,
    private _studentTask: StudentTaskService
  ) {
    this._auth.currenUser.pipe().subscribe(res => {
      this.student = res;
    })
  }

  ngOnInit() {
    this.getStudentTask();
  }

  getStudentTask() {
    this._studentTask.getAllTaskById(this.student.id).subscribe(res => {
      this.stuentTasks = res;
    })
  }

  load(check:boolean){
    if(check){
      this.getStudentTask();
    }
  }


}
