import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';

describe('LocalstorageService', () => {
  let service: LocalstorageService;

 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]

    });
    service = TestBed.inject(LocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
