import messaging from "@react-native-firebase/messaging";
import {Notifications} from "react-native-notifications";
export default class PushNotification {
  static removeToken = async () => {
    await messaging().deleteToken();
    return true;
  };
  static checkNotificationStatus = () => {
    return new Promise((resolve, reject) => {
      if (!messaging().isRegisteredForRemoteNotifications) {
        messaging()
          .registerForRemoteNotifications()
          .then(resp => resolve(resp))
          .catch(e => reject(e));
      } else {
        resolve(true);
      }
    });
  };
  static getFirebaseToken = () => {
    return new Promise((resolve, rej) => {
      this.checkNotificationStatus()
        .then(res => {
          if (res) {
            PushNotification.hasFirebasePermission().then(hasPermission => {
              if (hasPermission) {
                messaging()
                  .getToken()
                  .then(token => {
                    // this.firebaseRemoteMessageListener();
                    resolve(token);
                  })
                  .catch(e => rej(e));
              }
              PushNotification.requestFirebasePermission().then(() => {
                messaging()
                  .getToken()
                  .then(token => {
                    // this.firebaseRemoteMessageListener();
                    resolve(token);
                  })
                  .catch(e => rej(e));
              });
            });
          }
        })
        .catch(e => {
          rej(e);
        });
    });
  };

  static hasFirebasePermission = () => {
    return new Promise((res, rej) => {
      messaging()
        .hasPermission()
        .then(hasPermission => res(hasPermission))
        .catch(e => rej(e));
    });
  };

  static requestFirebasePermission = () => {
    return new Promise((res, rej) => {
      messaging()
        .requestPermission()
        .then(permissionRequest => res(permissionRequest))
        .catch(e => rej(e));
    });
  };

  static firebaseRemoteMessageListener = () => {
    Notifications.registerRemoteNotifications();
    Notifications.getInitialNotification()
      .then(notification => {
        console.log("Initial notification was:", notification);
      })
      .catch(err => console.error("getInitialNotifiation() failed", err));
    Notifications.removeAllDeliveredNotifications();
    Notifications.events().registerNotificationReceivedForeground(
      (notification: Notification, completion) => {
        console.log(
          "Notification received in foreground:",
          notification,
          notification.payload,
        );

        completion({
          alert: true,
          sound: true,
          badge: false,
        });
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        Notifications.removeAllDeliveredNotifications();
        completion();
      },
    );
  };
}
