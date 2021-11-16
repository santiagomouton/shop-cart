import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  IConfirmBoxPublicResponse,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor() {}

  private setInitContent(
    title: string,
    message: string,
    notification: ToastNotificationInitializer
  ) {
    notification.setTitle(title);
    notification.setMessage(message);
    notification.setConfig({
      AutoCloseDelay: 4000,
      TextPosition: 'left',
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.BOTTOM_LEFT,
    });
  }

  public infoNotification(title: string, message: string): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent(title, message, notification);
    notification.setConfig({ LayoutType: DialogLayoutDisplay.INFO });
    notification.openToastNotification$();
  }

  public successNotification(title: string, message: string): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent(title, message, notification);
    notification.setConfig({ LayoutType: DialogLayoutDisplay.SUCCESS });
    notification.openToastNotification$();
  }

  public warningNotification(title: string, message: string): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent(title, message, notification);
    notification.setConfig({ LayoutType: DialogLayoutDisplay.WARNING });
    notification.openToastNotification$();
  }

  /**
   * Despliega un dialog para confirmacion o cancelacion de compra
   * @returns suscripcion a Booleano que identifica la accion tomada
   */
  confirmBox(): Observable<IConfirmBoxPublicResponse> {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Todo listo');
    newConfirmBox.setMessage('Enviar carrito o desea seguir viendo productos');

    // Choose layout color type
    newConfirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.INFO,
      ConfirmLabel: 'Confirmar carrito',
      DeclineLabel: 'Seguir comprando',
    });

    // Simply open the popup
    return newConfirmBox.openConfirmBox$();
  }
}
