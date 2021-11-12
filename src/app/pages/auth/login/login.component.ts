import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public iuser: IUser = {email: '', password: ''}

  constructor( private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'Ingresa Email',
        required: true,
        pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'       
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl?.value}" no es un email valido`,
        },
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Contraseña',
        placeholder: 'Ingresa contraseña',
        required: true,
        minLength: 6
      }
    }
  ];

  onSubmit() {
    console.log(this.iuser);
    this.authService.login(this.iuser.email, this.iuser.password).then( res => {
      console.log(res);
      this.router.navigate(['/home']);
    });
  }


}
