import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';

import { AuthService } from './auth.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../models/user';
import { JWTRequest } from '../models/JWTRequest';
import { JWTRespone } from '../models/JWTRespone';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([]), 
        MatSnackBarModule ],
      providers: [
        AuthService
      ]
    });

    //Instantaites HttpClient, HttpTestingController and AuthService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });


  describe('#authenticate user', () => {
    let expectedJWTRespone : JWTRespone;
    let jwtReq : JWTRequest;

    beforeEach(() => {
      expectedJWTRespone =  {
        jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      }as JWTRespone;
      jwtReq ={username:"john@123",password:"testpassword"} as JWTRequest;
    });

    //Test case 1
    it('should return jwt token', () => {
      service.signIn(jwtReq).subscribe(
        data => expect(data).toEqual(expectedJWTRespone, 'should return jwt token'),
        fail
      );
      const req = httpTestingController.expectOne(service.signinUrl);
      expect(req.request.method).toEqual('POST');
  
      // Expect server to return the employee after POST
      const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: expectedJWTRespone });
      req.event(expectedResponse);
    });

  });


  describe('#Sign up user', () => {
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
      service.signUp(expectedUser).subscribe(
        data => expect(data).toEqual(expectedUser, 'should update and return user'),
        fail
      );
      const req = httpTestingController.expectOne(service.signupUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedUser);
  
      // Expect server to return the employee after POST
      const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: expectedUser });
      req.event(expectedResponse);
    });

  });

});
