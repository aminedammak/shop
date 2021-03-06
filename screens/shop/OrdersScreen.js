import React, { useEffect, useCallback } from "react";
import { FlatList, Text, Platform, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as ordersActions from "../../store/actions/orders";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch();

  // const loadOrder = useCallback(async () => {
  //   await dispatch(ordersActions.fetchOrders());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(ordersActions.fetchOrders());
  }, [dispatch]);
  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No orders found! Maybe start ordering some products?</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
