//export type MessageType = "none" | "default" | "info" | "success" | "danger" | "warning";
import { showMessage } from "react-native-flash-message";

export function successNotification(message: string) {
  showMessage({
    message,
    type: 'success',
    duration: 4000
  });
}

export function dangerNotification(message: string) {
  showMessage({
    message,
    type: 'danger',
    duration: 4000
  });
}

export function warningNotification(message: string) {
  showMessage({
    message,
    type: 'warning',
    duration: 4000
  });
}

export function infoNotification(message: string) {
  showMessage({
    message,
    type: 'info',
    duration: 4000
  });
}
