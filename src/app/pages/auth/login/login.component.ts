import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { NotifyService } from '../../../services/notify.service';
import { IStates } from '../../../redux/reducers/index';
import { signIn } from '../../../redux/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  public iuser: IUser = { email: '', password: '' };

  constructor(
    private router: Router,
    private authService: AuthService,
    private authStore: Store<IStates>,
    private message: NotifyService
  ) {}

  ngOnInit(): void {}

  // Formulario reactivo con la extencion formly
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
        pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) =>
            `"${field.formControl?.value}" no es un email valido`,
        },
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Contraseña',
        placeholder: 'Ingresa contraseña',
        required: true,
        minLength: 6,
      },
    },
  ];

  // Mensaje de bienvenida y navegacion al home
  onSubmit() {
    this.authService.login(this.iuser).then((res) => {
      if (res) {
        this.message.successNotification('Bienvenido', 'logueo exitoso');
        this.authStore.dispatch(signIn());
        this.router.navigate(['/home']);
      } else {
        this.message.warningNotification(
          'Ooooops!',
          'Usuario o contraseña incorrectos'
        );
      }
    });
  }
}
