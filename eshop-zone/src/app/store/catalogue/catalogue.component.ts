import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CatalogueService } from 'src/app/services/catalogue.service';import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {


  constructor(
    private catalogueService: CatalogueService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private test:LocalstorageService, 
    private navBarService:NavBarService,
    private localstorageService: LocalstorageService,
    private userService:UserService
    
  ) { }
  
  itemQtyMap= new Map();  
  products: Product[] = [];
  cart:Cart= <Cart>{};
  isLoggedIn:boolean=false;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  getAllProducts(): void {
    this.catalogueService.getAllProducts()
      .subscribe(data => this.products = data);
      this.getCart();
  }

  getByCategory(category: string): void {
    this.catalogueService.getByCategory(category)
      .subscribe(data => this.products = data);
      this.getCart();
  }

  getCart(): void {
    if(!this.localstorageService.getUser()){
      return;
    }
    this.setAsLoggedIn();
    this.userService.setAsLoggedIn();
    this.cartService.getCart()
      .subscribe(data => {
        this.cart = data;
        this.setQtyMap();
      });
  }

  setAsLoggedIn(){
    console.log("ist eree");
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn=>{this.isLoggedIn=isLoggedIn;
        console.log("this works");
      }
    );
  }

  setQtyMap(){
    this.itemQtyMap= new Map(); 
    if(this.cart){
      for(let item of this.cart.items){
        this.itemQtyMap.set(item.id,item.quantity);
      }
    }
    this.navBarService.setItemCount(this.itemQtyMap.size);
  }

  addToCart(item: Product):void{
    let newCartItem:CartItem=Object.assign({quantity: 1}, item);
    this.cartService.addItem(newCartItem).subscribe(result=>{
      this.cart=result;
      this.setQtyMap();
      if(this.cart){
        this.snackBar(item.name+" is added to cart");
      }
    })
  }

  removeFromCart(item: Product):void{
    let thisCartItem:CartItem=Object.assign({quantity: 0}, item);
    this.cartService.deleteItem(thisCartItem).subscribe(result=>{
      this.cart=result;
      this.setQtyMap();
      this.snackBar(item.name+" is removed from cart");
    })
  }


  snackBar(mesage:string){
    this._snackBar.open(mesage, 'close', {
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

}
