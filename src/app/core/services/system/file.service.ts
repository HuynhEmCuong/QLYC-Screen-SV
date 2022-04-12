import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OperationFileResult } from '../../models/general/operation-file-result';
import { OperationResult } from '../../models/general/operation-result';


const API = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private readonly http: HttpClient) { }


  uploadFile(files: any, request: string) {
    return this.http.post<OperationFileResult>(`${API}/File/UploadFileStudent?requestType=${request}`, files);
  }
  removeFile(fileName: string) {
    return this.http.get<OperationResult>(`${API}/File/RemoveFileStudent?fileName=${fileName}`);
  }
}
