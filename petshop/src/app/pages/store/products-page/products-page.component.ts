import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  //$ pra dizer que é assincrono
  public products$: Observable<Product[]>;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.products$ = this.data.getProducts();
  }

}
