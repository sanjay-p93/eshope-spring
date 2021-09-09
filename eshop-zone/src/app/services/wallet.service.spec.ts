import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatDialogModule]

    });
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
