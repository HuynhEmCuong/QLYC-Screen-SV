/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SweetalertService } from './sweetalert.service';

describe('Service: Sweetalert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SweetalertService]
    });
  });

  it('should ...', inject([SweetalertService], (service: SweetalertService) => {
    expect(service).toBeTruthy();
  }));
});
