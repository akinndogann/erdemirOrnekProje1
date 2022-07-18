import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product } from './product';

@Injectable()
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<any>('assets/products.json').pipe(map(res => res.data))
  }

}
