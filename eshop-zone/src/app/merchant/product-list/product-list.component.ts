import { Component,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  products: Product[] = [];
  isRequest:boolean=false;

  snackBar(mesage:string){
    this._snackBar.open(mesage, 'close', {
      duration: 3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  

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
        this.productService.deleteProduct(id).subscribe(result=> {
          console.log(result);
          this.getAllProducts();
          this.snackBar(`${name} was deleted.`);
        });
    });

  }

  

  ngOnInit(): void {
    this.navBarService.displayNav();
    this.getAllProducts();
  }

}

