import { TestBed } from '@angular/core/testing';

import { InputDisplayCommService } from './input-display-comm.service';

describe('InputDisplayCommService', () => {
  let service: InputDisplayCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputDisplayCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
