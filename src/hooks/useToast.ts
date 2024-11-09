import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export const useToast = () => {
  const showToast = (message = "", type = "", desc = "") => {
    Toast.show({
      type: type,
      text1: message,
      text2: desc,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: Platform.OS === 'android' ? 22 : 60
      // position: 'bottom'
    });
  };

  return showToast;
};
