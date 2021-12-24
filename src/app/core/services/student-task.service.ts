import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperationResult } from '../models/general/operation-result';
import { StudentTask } from '../models/student/student-task';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StudentTaskService {

  constructor(private _http: HttpClient) { }

  async addTask(data: StudentTask) {
    return firstValueFrom(this._http.post<OperationResult>(`${API}/StudentTask/AddUserTask`, data))
  }
}


