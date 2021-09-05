import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { OrderService } from 'src/app/services/order.service';



@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(
    private orderService:OrderService,
    private localstorageService: LocalstorageService,
    private navBarService:NavBarService
  ) { }

  user?:User;
  orders:Order[]=[];
  orderList:Order[]=[];
  status:string="";

  setList(status:string){
    this.status=status;
    if(this.status.length==0){
      this.orderList=this.orders;
    }
    else{
      this.orderList= this.orders.filter(order =>{
        return order.orderStatus == this.status
      })
    }
  }

  getOrders(){
    if(this.user?.role == "ADMIN"){
        this.orderService.getall().subscribe(
          orderList=>{
            this.orders=orderList.reverse();
            this.setList("");
        });
    }
    else{
      this.orderService.getUserOrder().subscribe(
        orderList=>{
          this.orders=orderList.reverse();
          this.setList("");
      });
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
    this.navBarService.displayNav();
    this.user=this.localstorageService.getUser();
    this.getOrders();
  }

}
