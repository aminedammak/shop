import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Text, AsyncStorage } from "react-native";
import * as authActions from "../store/actions/auth";

export default StartupScreen = (props) => {
  const dispatch = useDispatch();
  //Use this to clear the user authentication data from the local storage
  //AsyncStorage.removeItem("userData");
  useEffect(() => {
    const getItems = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }

      const data = JSON.parse(userData);

      const { userId, token, expiryDate } = data;

      const now = new Date().toISOString();

      const expirationDate = new Date(expiryDate);

      if (expirationDate < now || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const timeNow = new Date().getTime();
      const expiryTime = expirationDate.getTime();
      console.log("expiryTime", expiryTime);
      console.log("timeNow", timeNow);

      const expiresIn = expiryTime - timeNow;

      props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token, expiresIn));
      console.log("expiresIn", expiresIn);
    };
    getItems();
  }, []);

  return <Text>Startup screen</Text>;
};
