import React from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu perfil de Resto CLub</Text>
      <Text style={styles.description}>
        {" "}
        ¿como describirias tu mejor restaurante? Busca y vizualiza los mejores
        restuarantes de una forma sencilla, vota cual te ga gustado mas y
        comenta como ha sido tu experiancia.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="ver tu perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}
export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    height: 250,
    width: "100%",
    marginTop: 30
  },

  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 30,
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    marginTop: 20
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  btnStyle: {
    backgroundColor: "#00a680"
  },
  btnContainer: {
    width: "50%"
  }
});
