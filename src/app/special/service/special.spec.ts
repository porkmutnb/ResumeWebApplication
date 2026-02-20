import { TestBed } from '@angular/core/testing';

import { Special } from './special';

describe('Special', () => {
  let service: Special;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Special);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
