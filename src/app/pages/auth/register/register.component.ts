import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  iuser: IUser = { email: '', password: ''};

  constructor( private router: Router, private authService: AuthService, private message: NotifyService ) { }

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
        pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'       
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl?.value}" no es un email valido`,
        },
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
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

  // Mensaje de registro exitoso y navegacion al login para iniciar sesion
  onSubmit() {
    this.authService.register(this.iuser)
    .then( res => {
      if(res) { 
        this.message.successNotification('Registro exitoso!', 'Ahora acceda con el email y la contraseña')
        this.router.navigate(['/login']);
      } else {
        this.message.infoNotification('Ooooops!', 'Ah ocurrido un error, intente mas tarde nuevamente')
      }
    })
  }

}
