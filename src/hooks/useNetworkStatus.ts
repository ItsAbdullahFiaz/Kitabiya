import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useNetworkStatus = () => {
  const [isInternetConnected, setIsInternetConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetConnected(state.isConnected);
    });

    NetInfo.fetch().then((state) => {
      setIsInternetConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return isInternetConnected;
};
