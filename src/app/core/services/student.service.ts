import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperationResult } from '../models/general/operation-result';
import { UserToken } from '../models/student/student';

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


  updateInfo = (model: UserToken): Observable<OperationResult> => this._http.post<OperationResult>(`${API}/Student/UpdateStudent`, model)



}
