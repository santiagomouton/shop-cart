import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  iuser = new IUser()

  constructor() { }

  ngOnInit(): void {
  }

  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'Ingresa Email',
        required: true,
        pattern: '/[a-zA-Z-._]+\@[a-zA-Z-._]+\.[a-zA-Z]+/g'
      },
      validation: {
        messages: {
          pattern: (error) => `No es un email valido`,
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
      }
    }
  ];

  onSubmit() {
    console.log(this.iuser);
    
  }


}
