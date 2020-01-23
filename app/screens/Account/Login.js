import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider, registerCustomIconType } from "react-native-elements";

export default function Login(props) {
  const { navigation } = props;

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={Styles.logo}
        resizeMode="contain"
      />
      <View style={Styles.viewContainer}>
        <Text>Form Login...</Text>

        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={Styles.divider} />
      <View style={Styles.viewContainer}>
        <Text>Login Facebook</Text>
      </View>
    </ScrollView>
  );
}

function CreateAccount(props) {
  const { navigation } = props;

  return (
    <Text style={Styles.textRegister}>
      ¿Aun no tienes una cuenta?
      <Text
        style={Styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        Registrarte
      </Text>
    </Text>
  );
}

const Styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold"
  }
});
