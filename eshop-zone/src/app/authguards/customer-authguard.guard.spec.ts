import { TestBed } from '@angular/core/testing';

import { CustomerAuthguardGuard } from './customer-authguard.guard';

describe('CustomerAuthguardGuard', () => {
  let guard: CustomerAuthguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerAuthguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
