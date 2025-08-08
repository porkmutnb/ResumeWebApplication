import { TestBed } from '@angular/core/testing';

import { Backoffice } from './backoffice';

describe('Backoffice', () => {
  let service: Backoffice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Backoffice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
