import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ActionButton, { actionButton } from "react-native-action-button";
import * as firebase from "firebase";

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.ViewBody}>
      <Text>Estamos en Restaurantes. </Text>

      {user && <AddRestaurantButton navigation={navigation} />}
    </View>
  );
}

function AddRestaurantButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddRestaurant")}
    />
  );
}
const styles = StyleSheet.create({
  ViewBody: {
    flex: 1
  }
});
