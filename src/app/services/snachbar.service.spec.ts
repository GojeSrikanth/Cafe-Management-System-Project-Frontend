import { TestBed } from '@angular/core/testing';

import { SnachbarService } from './snachbar.service';

describe('SnachbarService', () => {
  let service: SnachbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnachbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
