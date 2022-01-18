import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department/depart';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private readonly _http: HttpClient) { }


  getAll(): Observable<Department[]> {
    return this._http.get<Department[]>(`${API}/Department/GetAll`)
  }
}
