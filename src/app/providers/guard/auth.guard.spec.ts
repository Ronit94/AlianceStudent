import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateGuard } from './auth.guard';

describe('CanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateGuard]
    });
  });

  it('should ...', inject([CanActivateGuard], (guard: CanActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
