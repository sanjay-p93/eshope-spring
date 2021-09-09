import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from './user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Address } from '../models/address';
import { MatDialogModule } from '@angular/material/dialog';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([]), 
        MatSnackBarModule, MatDialogModule ],
      providers: [
        UserService
      ]
    });

    //Instantaites HttpClient, HttpTestingController and UserService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });


  describe('#getUserByEmail', () => {
    let expectedUser: User;
    let email:string;

    beforeEach(() => {
      expectedUser =  {
        id: "6128c3d58264ed20b8071c8",
        name:  "john",
        phone: 9876543210,
        email: "john@123",
        password: "$2a$05$0xAxbdRyYj6XW.0uCC2iBOPVi./TJqllkMlyTCRRQjhraKVEua2",
        role:   "ADMIN",
        address: {
          building:"Dew Homes",
          street:"XYZ streets",
          landmark:"Golf view Hotels and suits",
          city:"EKM",
          zip:121212
        }
      }as User;
      email ="john@123" as string;
    });

    //Test case 1
    it('should return expected user by passing email', () => {
      service.getUserDetails(email).subscribe(
        data => expect(data).toEqual(expectedUser, 'should return expected user'),
        fail
      );
      const req = httpTestingController.expectOne(service.userUrl+"user/"+email);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedUser); 
    });

  });



  describe('#updateDetails', () => {
    let expectedUser: User;
    let email:string;

    beforeEach(() => {
      expectedUser =  {
        id: "6128c3d58264ed20b8071c8",
        name:  "john",
        phone: 9876543210,
        email: "john@123",
        password: "$2a$05$0xAxbdRyYj6XW.0uCC2iBOPVi./TJqllkMlyTCRRQjhraKVEua2",
        role:   "ADMIN",
        address: {
          building:"Dew Homes",
          street:"XYZ streets",
          landmark:"Golf view Hotels and suits",
          city:"EKM",
          zip:121212
        }
      }as User;
      email ="john@123" as string;
    });

    //Test case 1
    it('should return expected product by passing id', () => {
      service.updateDetails(expectedUser).subscribe(
        data => expect(data).toEqual(expectedUser, 'should update and return user'),
        fail
      );
      const req = httpTestingController.expectOne(service.userUrl+"save");
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedUser);
  
      // Expect server to return the user after POST
      const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: expectedUser });
      req.event(expectedResponse);
    });

  });

});
 