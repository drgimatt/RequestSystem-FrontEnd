import { TestBed } from '@angular/core/testing';

import { UserrolesService } from './userroles.service';

describe('UserrolesService', () => {
  let service: UserrolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserrolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
