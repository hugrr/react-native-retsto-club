import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import LoginForm from "../../components/Account/loginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Login(props) {
  const { navigation } = props;
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={Styles.logo}
        resizeMode="contain"
      />
      <View style={Styles.viewContainer}>
        <LoginForm toastRef={toastRef} />

        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={Styles.divider} />
      <View style={Styles.viewContainer}>
        <LoginFacebook />
      </View>
      <Toast
        ref={toastRef}
        style={{ backgroundColor: "black" }}
        position="top"
        positionValue={300}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
      />
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
