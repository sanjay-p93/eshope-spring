import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService:CartService,
    private navBarService:NavBarService,
    private _snackBar: MatSnackBar
  ) { }
  cart!:Cart;
  isDisabled:boolean=false;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  imgErrorHandler(event:any) {
    event.target.src = './assets/img/altImg.png';
  }

  getCart(){
    if(this.isDisabled){
      return;
    }
    this.isDisabled=true;
    this.cartService.getCart().subscribe(data => {
        this.cart = data;
        if(this.cart){
          this.navBarService.setItemCount(this.cart.items.length);
        }
        else{
          this.navBarService.setItemCount(0);
        }
        this.isDisabled=false;
    });
  }

  removeFromCart(item: CartItem):void{
    if(this.isDisabled){
      return;
    }
    this.isDisabled=true;
    this.cartService.deleteItem(item).subscribe(data=>{
      this.cart=data;
      if(this.cart){
        this.snackBar(item.name+" is removed from cart");
        this.navBarService.setItemCount(this.cart.items.length);
      }
      else{
        this.snackBar(item.name+" is removed from cart");
        this.navBarService.setItemCount(0);
      }
      this.isDisabled=false;
    })
  }


  updateQuantiy(item:CartItem){
    if(this.isDisabled){
      return;
    }
    this.isDisabled=true;
    this.cartService.updateQuantity(item).subscribe(data=>{
      this.cart=data;
      this.isDisabled=false;
    });
  }

  quantityUpdate(qty:number,idx:number,item:CartItem){
    if(qty>10){
      this.snackBar("Maximum allowed quantity is 10 number per item");
      item.quantity=10;
      this.cart.items[idx].quantity=item.quantity;
    }
    else if(qty<1||null){
      this.snackBar("Invalid quantity");
      item.quantity=1;
    }
    else{
      item.quantity=qty
    }
    this.updateQuantiy(item);
  }

  stepDown(idx:number,item:CartItem){

    if(item.quantity<2){
      this.removeFromCart(item);
      return;
    }
    this.cart.items[idx].quantity=--item.quantity;
    this.updateQuantiy(item);
  }

  stepUp(idx:number,item:CartItem){
    if(item.quantity>=10){
      this.snackBar("Maximum allowed quantity is 10 number per item");
      return;
    }
    this.cart.items[idx].quantity=++item.quantity;
    this.updateQuantiy(item);
  }

  snackBar(mesage:string){
    this._snackBar.open(mesage, 'close', {
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  getTotalNumber(){
    let count=0
    for(let item of this.cart.items){
      count=count+item.quantity;
    }
    return count;
  }

  ngOnInit(): void {
    this.navBarService.displayNav();
    this.getCart();
  }

}
