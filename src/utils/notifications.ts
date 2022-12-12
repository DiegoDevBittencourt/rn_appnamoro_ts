import { showMessage } from "react-native-flash-message";

export function successNotification(message: string) {
  showMessage({
    message: message,
    type: 'success',
    duration: 4000
  });
}

export function dangerNotification(message: string) {
  showMessage({
    message: message,
    type: 'danger',
    duration: 4000
  });
}
