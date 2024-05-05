import { TestBed } from '@angular/core/testing';

import { AddDialogService } from './add-dialog.service';

describe('AddDialogService', () => {
  let service: AddDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
