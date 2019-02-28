/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PushPermissionService } from './push-permission.service';

describe('Service: PushPermission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushPermissionService]
    });
  });

  it('should ...', inject([PushPermissionService], (service: PushPermissionService) => {
    expect(service).toBeTruthy();
  }));
});
