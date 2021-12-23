import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperationResult } from '../models/general/operation-result';
import { UserToken } from '../models/student/user';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _http: HttpClient) {

  }

  getAll() {
    return this._http.get(`${API}/Student/GetAll`).pipe(
      map(res => {
        return res as UserToken[]
      })
    );
  }


  updateInfo = (model: UserToken) => this._http.post(`${API}/Student/UpdateStudent`, model)




}
