import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  products: Observable<any[]>;

  constructor( private firestore: AngularFirestore) {
    this.products = this.firestore.collection('products').valueChanges();
    console.log(this.products.subscribe(res => console.log(res)));
  }

  ngOnInit(): void {
/*     this.firestore.collection('products').get().subscribe( res => {
      if( typeof res !== 'undefined'){
        this.products = res;
      }
    }); */
  }

}
