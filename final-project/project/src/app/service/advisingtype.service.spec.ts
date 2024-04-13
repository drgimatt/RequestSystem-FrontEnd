import { TestBed } from '@angular/core/testing';

import { AdvisingtypeService } from './advisingtype.service';

describe('AdvisingtypeService', () => {
  let service: AdvisingtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvisingtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
