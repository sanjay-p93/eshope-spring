import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product';

import { CatalogueService } from './catalogue.service';

describe('CatalogueService', () => {
  let service: CatalogueService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CatalogueService
      ]
    });

    //Instantaites HttpClient, HttpTestingController and CatalogueService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CatalogueService);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  describe('#getAllProducts', () => {
    let expectedProducts: Product[];

    beforeEach(() => {
      expectedProducts = [{
        id:"6129af9906a9bf72d1e3b101",
          name:"Solimo Shower Gel",
          description:"Lemon & Tea Tree - 750 ml & Amazon Brand - Solimo Shower Gel, Cool Menthol - 750 ml",
          price:500,
          category:"PERSONAL-CARE",
          imageUrl:"https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg"
        },{
          id:"6129af9906a9bf72d1e3b102",
        name:"Shower Gel23232323",
        description:"Lemon 232323& Tea Tree - 750 ml & Amazon Brand - Solimo Shower Gel, Cool Menthol - 750 ml",
        price:5000,
        category:"PERSONAL-CARE",
        imageUrl:"https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg"
      }] as Product[];
    });
    
    //Test case 1
    it('should return expected products by calling once', () => {
      service.getAllProducts().subscribe(
        data => expect(data).toEqual(expectedProducts, 'should return expected products'),
        fail
      );
      const req = httpTestingController.expectOne(service.catalogueUrl+"products");
      expect(req.request.method).toEqual('GET');
      req.flush(expectedProducts); 
    });
    
    //Test case 2
    it('should be OK returning no products', () => {
      service.getAllProducts().subscribe(
        data => expect(data.length).toEqual(0, 'should have empty products array'),
        fail
      );

      const req = httpTestingController.expectOne(service.catalogueUrl+"products");
      req.flush([]); //Return empty data
    });
    
    //Test case 3
    it('should turn 404 error into an empty products result', () => {
      service.getAllProducts().subscribe(
        data => expect(data.length).toEqual(0, 'should return empty products array'),
        fail
      );

      const req = httpTestingController.expectOne(service.catalogueUrl+"products");

      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' }); 
    });

  });


  describe('#getProductById', () => {
    let expectedProduct: Product;
    let id:string;

    beforeEach(() => {
      expectedProduct = {
        id:"6129af9906a9bf72d1e3b101",
          name:"Solimo Shower Gel",
          description:"Lemon & Tea Tree - 750 ml & Amazon Brand - Solimo Shower Gel, Cool Menthol - 750 ml",
          price:500,
          category:"PERSONAL-CARE",
          imageUrl:"https://m.media-amazon.com/images/I/71Jmd1zPfRL._SY879_.jpg"
        }as Product;
        id ="6129af9906a9bf72d1e3b101" as string;
    });

    //Test case 1
    it('should return expected product by passing id', () => {
      service.getById(id).subscribe(
        data => expect(data).toEqual(expectedProduct, 'should return expected products'),
        fail
      );
      const req = httpTestingController.expectOne(service.catalogueUrl+"product/"+id);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedProduct); 
    });

  });


});
