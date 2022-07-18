import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { concatMap, from, Observable, tap } from 'rxjs';
import { Product } from './product';
import { ProductService } from './productservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrls: ['./app.component.scss']

})
export class AppComponent {

  products: Product[]

  difference: number;
  result: number;
  date: string;
  defaultDate = new Date();
  // path = "http://localhost:3000/data"


  constructor(
    private productService: ProductService,
    private httpClient: HttpClient
  ) {
    this.date = `${this.getMM(this.defaultDate)}-${this.getDD(this.defaultDate)}-${this.defaultDate.getFullYear()}`;
  }

  getMM(date: Date) {
    const month = date.getMonth() + 1;
    return month < 10 ? `0${month}` : month;
  }

  getDD(date: Date) {
    const day = date.getDate();
    return day < 10 ? `0${day}` : day;
  }

  ngOnInit() {
    // this.productService
    //   .getProducts().subscribe(data => {
    //     this.products = data;
    //   });
    // this.path + `?date=${this.date}`
  }

  dateSelected($event: any) {
    console.log($event);
  }

  newQuantity(a:number, b:number){
    return Number(a) + Number(b)
  }

  getDayProduct(){
    const query = this.date ? `?date=${this.date}` : '';
    this.httpClient.get<Product[]>(`http://localhost:3000/products${query}`).subscribe(data => {
      this.products = data;
    })
  }

  save() {
    from(this.products).pipe(
      concatMap(product => this.httpClient.put<Product>(`http://localhost:3000/products/${product.id}`, {
        ...product,
        usedQuantity: this.newQuantity(product.usedQuantity, product.difference),
        // difference: 0
      }))
    ).subscribe(updated => {
      const index = this.products.findIndex(({id}) => id === updated.id);
      // Object.assign(this.products[index], updated);
    });
  }


}
