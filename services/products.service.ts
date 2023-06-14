import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product.model';
import { PageProduct } from './../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products! : Product[];

  pageProduct! : PageProduct

  constructor() { 
    this.products = [
      {id:UUID.UUID(),name:'Computer',price:250000,promotion:true},
      {id:UUID.UUID(),name:'Phone',price:17000,promotion:false},
      {id:UUID.UUID(),name:'Tablette',price:20000,promotion:true}
    ]
    for(let i=0;i<100;i++){
      this.products.push(
        {id:UUID.UUID(),name:'Computer',price:250000,promotion:true},
        {id:UUID.UUID(),name:'Phone',price:17000,promotion:false},
        {id:UUID.UUID(),name:'Tablette',price:20000,promotion:true}
      )
    }
  }

  getAllProducts(): Observable<Product[]>{
    return of(this.products);
  }

  getPageProducts(): Observable<Product[]>{
    this.pageProduct.numberOfProducts = 5;
    this.pageProduct.totalPage = ~~(this.products.length/this.pageProduct.numberOfProducts);
    return of(this.products.slice(0,this.pageProduct.numberOfProducts));
  }


  deleteProducts(id:string) : Observable<boolean>{
   this.products=this.products.filter(p => p.id != id);
    return of(true);
  } 

  searchProducts(keyword : string): Observable<Product[]>{
    let produts = this.products.filter(p => p.name.includes(keyword))
    return of(produts);
  }
}
