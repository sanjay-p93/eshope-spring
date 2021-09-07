import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CatalogueService } from 'src/app/services/catalogue.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

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
    private navBarService:NavBarService,
    private localstorageService: LocalstorageService,
    private userService:UserService,
    public dialog: MatDialog
    
  ) { }
  
  itemQtyMap= new Map();  
  products: Product[] = [];
  productsList: Product[] = [];
  cart:Cart= <Cart>{};
  isRequest:boolean=false;
  isLoggedCustomer:boolean=false


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

   
  imgErrorHandler(event:any) {
    event.target.src = './assets/img/altImg.png';
  }

  setList(category:string){
    if(category=="All"){
      this.productsList=this.products;
    }
    else{
      this.productsList= this.products.filter(x =>{
        return x.category == category
      })
    }
  }

  getAllProducts(): void {
    this.isRequest=true;
    this.catalogueService.getAllProducts()
      .subscribe(data => {
        this.products = data
        this.setList("All");
      });
      this.isRequest=false;
      this.getCart();
  }

  getCart(): void {
    this.isLoggedCustomer=false;
    if(!this.localstorageService.getUser()||!this.localstorageService.getRole()||(this.localstorageService.getRole()=='ADMIN')){
      return;
    }
    this.isLoggedCustomer=true;
    this.isRequest=true;
    this.cartService.getCart()
      .subscribe(data => {
        this.cart = data;
        this.setQtyMap();
        this.isRequest=false;
      });
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
    this.isRequest=true;
    let newCartItem:CartItem=Object.assign({quantity: 1}, item);
    this.cartService.addItem(newCartItem).subscribe(result=>{
      this.cart=result;
      this.setQtyMap();
      this.isRequest=false;
      if(this.cart){
        this.snackBar(item.name+" is added to cart");
      }
    })
  }

  removeFromCart(item: Product):void{

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm',
        content:`Are you sure you want to remove ${item.name} from cart.`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }
      this.isRequest=true;
      let thisCartItem:CartItem=Object.assign({quantity: 0}, item);
      this.cartService.deleteItem(thisCartItem).subscribe(result=>{
        this.cart=result;
        this.setQtyMap();
        this.isRequest=false;
        this.snackBar(item.name+" is removed from cart");
      })
    });
  }


  snackBar(mesage:string){
    this._snackBar.open(mesage, 'close', {
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  setAsLoggedIn(){
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn=>{
        this.isLoggedCustomer=isLoggedIn;
      }
    );
  }

  ngOnInit(): void {
    this.navBarService.displayNav();
    this.setAsLoggedIn();
    this.getAllProducts();
  }

}
