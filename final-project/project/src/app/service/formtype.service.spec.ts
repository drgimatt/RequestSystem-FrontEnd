import { TestBed } from '@angular/core/testing';

import { FormtypeService } from './formtype.service';

describe('FormtypeService', () => {
  let service: FormtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
