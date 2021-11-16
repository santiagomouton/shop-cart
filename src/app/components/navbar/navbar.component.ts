import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { IStates } from '../../redux/reducers/index';
import { signOut } from '../../redux/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  public isSignIn: boolean = false

  constructor( public auth: AuthService, private store: Store<IStates> ) {
    store.select('authReducer').subscribe( res => {
      this.isSignIn =  res.isSignIn;
    })
  }

  ngOnInit(): void {
  }

  public navbarLogout() {
    this.store.dispatch(signOut());
    this.auth.logout();
  }

}
