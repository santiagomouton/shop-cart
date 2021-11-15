import { Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastPositionEnum,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {

  constructor() { }

  private setInitContent( title: string, message: string, notification: ToastNotificationInitializer ) {
    notification.setTitle( title );
    notification.setMessage( message );
    notification.setConfig({
      AutoCloseDelay: 3000,
      TextPosition: 'left',
      ProgressBar: ToastProgressBarEnum.NONE,
      ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
      ToastPosition: ToastPositionEnum.BOTTOM_LEFT,
    })
  }

  public infoNotification( title: string, message: string ): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent( title, message, notification );
    notification.setConfig({ LayoutType: DialogLayoutDisplay.INFO })
    notification.openToastNotification$();
  }

  public successNotification( title: string, message: string ): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent( title, message, notification );
    notification.setConfig({ LayoutType: DialogLayoutDisplay.SUCCESS })
    notification.openToastNotification$();
  }

  public warningNotification( title: string, message: string ): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent( title, message, notification );
    notification.setConfig({ LayoutType: DialogLayoutDisplay.WARNING })
    notification.openToastNotification$();
  }

}
