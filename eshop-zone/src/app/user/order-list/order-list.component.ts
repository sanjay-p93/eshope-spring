import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(
    private orderService:OrderService,
    private localstorageService: LocalstorageService,
    private userService:UserService,
  ) { }

  user?:User;
  orders:Order[]=[];

  getOrders(){
    if(this.user?.role == "ADMIN"){
        this.orderService.getall().subscribe(
          orderList=>this.orders=orderList.reverse()
        );
    }
    else{
      this.orderService.getUserOrder().subscribe(
        orderList=>this.orders=orderList.reverse()
      );
    }
  }

  complete(order:Order){
    this.orderService.completeOrder(order.id).subscribe(order=>{
      console.log(order);
      this.getOrders();
    });
  }

  cancel(order:Order){
    this.orderService.cancelOrder(order.id).subscribe(order=>{
      console.log(order);
      this.getOrders();
    });
  }

  getDate(id:string){
    const timestamp = id.toString().substring(0,8)
    return new Date( parseInt( timestamp, 16 ) * 1000 );
  }

  getBadgeClass(status:string){
    if(status=="PENDING"){
      return 'badge badge-danger';
    }
    else if(status=="COMPLETED"){
      return 'badge badge-light';
    }
    return 'badge badge-secondary';

  }

  ngOnInit(): void {
    this.user=this.localstorageService.getUser();
    if(!this.user){
      this.userService.logOut();
    }
    this.userService.setAsLoggedIn();
    this.getOrders();
  }

}
