import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckoutDetails } from '../models/checkoutDetails';
import { Order } from '../models/order';

import { CartService } from './cart.service';

describe('CartService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CartService;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,MatDialogModule],
      providers: [
        CartService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an accept checkout deatils and return order', () => {
    const checkoutDetails:CheckoutDetails  = {
      userId:"6128c3d98264ed20b80871c9",
      paymentType:"WALLET",
      address:{building: "DWE",street: "X STREET",landmark: "GOLF",city: "EKM",zip: 123456}
    };

    const order:Order  = {
      id:"90e0448276e1c11c7807ba49",
      userId:"60e0448276e1c11c7807ba49",
      totalPrice:1000,
      items:[{id: "6121fe17139a6628dd3a7dd5",name: "smart onewatch",description: "this is trst data",price: 500,category: "gadgets",imageUrl:"https://pbs.twimg.com/profile_images/1366466342354751491/JyhZpbtu_400x400.jpg",quantity: 5}],
      address:{building: "DWE",street: "X STREET",landmark: "GOLF",city: "EKM",zip: 123456},
      orderStatus:"PENDING",
      paymentType:"WALLET",
      transactionId:"60e0448276e1c11c7807ba49S"
    };


    service.checkOut(checkoutDetails).subscribe(
      data => expect(data).toEqual(order, 'should return the employee'),
      fail
    );
    const req = httpTestingController.expectOne(service.cartUrl+"checkout");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(checkoutDetails);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: order });
    req.event(expectedResponse);
  });


});
