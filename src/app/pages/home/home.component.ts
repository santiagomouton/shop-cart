import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  constructor( private firestore: AngularFirestore, public notify: NotifyService ) {
    this.firestore.collection('products').valueChanges().subscribe( res => {
      this.products = res; 
    });
  }

  ngOnInit(): void {
/*     this.firestore.collection('products').get().subscribe( res => {
      if( typeof res !== 'undefined'){
        this.products = res;
      }
    }); */
  }


}
