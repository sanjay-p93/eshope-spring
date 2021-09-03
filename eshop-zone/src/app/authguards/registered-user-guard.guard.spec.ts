import { TestBed } from '@angular/core/testing';

import { RegisteredUserGuardGuard } from './registered-user-guard.guard';

describe('RegisteredUserGuardGuard', () => {
  let guard: RegisteredUserGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegisteredUserGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
