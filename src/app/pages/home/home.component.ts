import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];

  constructor( private productService:ProductService, public notify: NotifyService ) {
  }
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      res.forEach((element: any) => {
        this.products = []  // clear any data in array
        this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })

  }


}
