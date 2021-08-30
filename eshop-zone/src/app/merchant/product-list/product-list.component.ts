import {AfterViewInit, Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,AfterViewInit {

  constructor() { }


  id:string="sasasa";

  delete(id:string){

  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

}

