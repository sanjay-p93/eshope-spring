import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EshopWalletComponent } from './eshop-wallet.component';

describe('EshopWalletComponent', () => {
  let component: EshopWalletComponent;
  let fixture: ComponentFixture<EshopWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EshopWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EshopWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
