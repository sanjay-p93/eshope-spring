import { Component,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  constructor(
    private catalogueService: CatalogueService,
    private navBarService:NavBarService,
    private productService:ProductService,
    public dialog: MatDialog
  ) { }

  
  products: Product[] = [];
  isRequest:boolean=false;


  getAllProducts() {
    this.catalogueService.getAllProducts()
      .subscribe(data => this.products = data);
  }


  delete(id:string,index:number,name:string){


    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm',
        content:`Are you sure to delete ${name}.`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }
      if(confirm("Are you sure to delete "+name)) {
        this.productService.deleteProduct(id).subscribe(result=> {
          console.log(result);
          this.getAllProducts();
        });
      }
    });

  }

  

  ngOnInit(): void {
    this.navBarService.displayNav();
    this.getAllProducts();
  }

}

