import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from './../model/product.model';
import { ProductsService } from './../services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products! : Array<Product>

  errorMessage !: string;

  searchGroup! : FormGroup

  constructor( private productService : ProductsService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.handleGetAllProducts();
    this.searchGroup = this.fb.group({
      keyword : this.fb.control(null)
    });
  }

  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next:(data : Product[]) => {
        this.products= data;
      },error: (err) =>{
        this.errorMessage = err;
      }
    });
  }

  handleGetPageProducts(){
    this.productService.getPageProducts().subscribe({
      next:(data : Product[]) => {
        this.products= data;
      },error: (err) =>{
        this.errorMessage = err;
      }
    });
  }

  handleDeleteProducts(p:Product){
    let conf = confirm('Are u sure ?');
    if (conf == false) return ;
     this.productService.deleteProducts(p.id).subscribe({
      next:(data)=>{
       // this.handleGetAllProducts();
       let index = this.products.indexOf(p);
       this.products.splice(index,1);

      }
     })
  }

  handleSearchProduct(){
    let keyword = this.searchGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next : (data) =>{
        this.products = data;
      }
    })
  
  }

  enablePromo(p : Product){
    
    p.promotion = !p.promotion;
  }

}
