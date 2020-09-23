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
        console.log("no user data");
        props.navigation.navigate("Auth");
        return;
      }

      const data = JSON.parse(userData);

      const { userId, token, expiryDate } = data;

      const now = new Date().toISOString();

      if (expiryDate < now || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token));
      console.log("user data");
    };
    getItems();
  }, []);

  return <Text>Startup screen</Text>;
};
