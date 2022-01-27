import { TestBed } from '@angular/core/testing';

import { JalaliPipeService } from './jalali-pipe.service';

describe('JalaliPipeService', () => {
  let service: JalaliPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JalaliPipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
