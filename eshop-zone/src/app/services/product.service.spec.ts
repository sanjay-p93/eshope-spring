import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Product } from '../models/product';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        ProductService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 it('should add an Procduct and return it', () => {
    const product: Product = {
        id:"6129af9906a9bf72d1e3b101",
        name:"Solimo Shower Gel",
        description:"Lemon & Tea Tree - 750 ml & Amazon Brand - Solimo Shower Gel, Cool Menthol - 750 ml",
        price:500,
        category:"PERSONAL-CARE",
        imageUrl:"https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg"
      }

    service.saveProduct(product).subscribe(
      data => expect(data).toEqual(product, 'should return the employee'),
      fail
    );
    const req = httpTestingController.expectOne(service.productUrl+"save");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(product);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: product });
    req.event(expectedResponse);
  });
});
