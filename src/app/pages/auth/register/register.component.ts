import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

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
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Contraseña',
        placeholder: 'Ingresa contraseña',
        required: true,
      }
    },
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Nombre Completo',
        placeholder: 'Ingresa nombre',
        required: true,
      }
    }
  ];

  onSubmit() {
    console.log(this.iuser);
  }

}