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

  setInitContent( title: string, message: string, notification: ToastNotificationInitializer ) {
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

  infoNotification( title: string, message: string ): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent( title, message, notification );
    notification.setConfig({ LayoutType: DialogLayoutDisplay.INFO })
    notification.openToastNotification$();
  }

  successNotification( title: string, message: string ): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent( title, message, notification );
    notification.setConfig({ LayoutType: DialogLayoutDisplay.SUCCESS })
    notification.openToastNotification$();
  }

  warningNotification( title: string, message: string ): void {
    let notification = new ToastNotificationInitializer();
    this.setInitContent( title, message, notification );
    notification.setConfig({ LayoutType: DialogLayoutDisplay.WARNING })
    notification.openToastNotification$();
  }

}
