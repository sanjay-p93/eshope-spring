import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private catalogueService: CatalogueService) { }

  products: Product[] = [];

  getProducts(filter :string): void {
    this.catalogueService.getProducts(filter)
      .subscribe(data => this.products = data);
  }

  onClickLog(): void {
    console.log(this.products);
  }

  ngOnInit(): void {
    this.getProducts("products");
  }

}
