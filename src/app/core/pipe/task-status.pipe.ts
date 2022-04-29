import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'taskstatus'
})
export class TaskStatusPipe implements PipeTransform {
  constructor(private _translate: TranslateService) { }
  transform(value: any): any {
    let result = '';
    switch (value) {
      case 1:
        result = this._translate.instant('status.receive');
        break;
      case 2:
        result = this._translate.instant('status.process');
        break;
      case 3:
        result =  this._translate.instant('status.complete');
        break;
      default:
        result =  this._translate.instant('status.cancel');
        break;
    }
    return result;
  }

}
