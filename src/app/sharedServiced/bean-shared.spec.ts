import { TestBed } from '@angular/core/testing';

import { BeanShared } from './bean-shared';

describe('BeanShared', () => {
  let service: BeanShared;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeanShared);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
