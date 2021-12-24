import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestType } from '../models/student/request-type';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<RequestType[]> {
    return this._http.get<RequestType[]>(`${API}/RequestType/GetAll`)
  }

}
