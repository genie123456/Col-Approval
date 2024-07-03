import { TestBed } from '@angular/core/testing';

import { ApplyingFormService } from './applying-form.service';

describe('ApplyingFormService', () => {
  let service: ApplyingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
