import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";

import { withNavigation } from "react-navigation";

function LoginFacebook(props) {
  const login = async () => {
    const { toastRef, navigation } = props;
    await Facebook.initializeAsync("178372246744000");
    const {
      type,
      token
    } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions }
    );

    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          console.log("Login correcto");
          navigation.navigate("MyAccount");
        })
        .catch(() => {
          console.log("error al acceder a Facebook, intentelo mas tarde");
        });
    } else if (type === "cancel") {
      console.log("Inicio de sesion cancelado");
    } else {
      console.log("Error desconocido, intentelo mas tarde");
    }
  };

  return (
    <SocialIcon
      title="Iniciar sesion con facebook"
      button
      type="facebook"
      onPress={login}
    />
  );
}
export default withNavigation(LoginFacebook);
