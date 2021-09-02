import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  constructor(
    private catalogueService: CatalogueService,
    private _snackBar: MatSnackBar,
    private navBarService:NavBarService,
    private localstorageService: LocalstorageService,
    private userService:UserService,
    private productService:ProductService,
    private http: HttpClient
  ) { }

  
  products: Product[] = [];
  isRequest:boolean=false;


  getAllProducts() {
    this.catalogueService.getAllProducts()
      .subscribe(data => this.products = data);
  }


  delete(id:string,index:number){
    this.productService.deleteProduct(id).subscribe(result=> {
      console.log(result);
      this.getAllProducts();
    });

  }

  

  ngOnInit(): void {
    this.navBarService.displayNav();
    this.getAllProducts();
  }

}

