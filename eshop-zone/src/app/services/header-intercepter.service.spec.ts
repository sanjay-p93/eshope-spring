import { TestBed } from '@angular/core/testing';

import { HeaderIntercepterService } from './header-intercepter.service';

describe('HeaderIntercepterService', () => {
  let service: HeaderIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
