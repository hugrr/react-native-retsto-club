import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import Modal from "../Modal";
import * as Location from "expo-location";

const WidthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [imageSelected, setImageSelected] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [isVisibleMap, setIsvisibleMap] = useState(false);
  const [LocationRestaurant, setLocationRestaurant] = useState(null);

  const AddRestaurant = () => {
    if (!restaurantName || !restaurantAddress || !restaurantDescription) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (imageSelected.length === 0) {
      toastRef.current.show("El restaurant tiene qe tener al menos una imagen");
    } else if (!LocationRestaurant) {
      toastRef.current.show("Tienes que localizar un restaurante en el mapa");
    } else {
      setIsLoading(true);
      console.log("Datos Correctos");
    }
  };

  return (
    <ScrollView>
      <ImageRestaurant imageRestaurant={imageSelected[0]} />
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantDescription={setRestaurantDescription}
        setIsvisibleMap={setIsvisibleMap}
        LocationRestaurant={LocationRestaurant}
      />
      <UploadImage
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        toastRef={toastRef}
      />

      <Button
        title="Crear Restaurant"
        onPress={AddRestaurant}
        buttonStyle={styles.btnAddRestaurante}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsvisibleMap={setIsvisibleMap}
        setLocationRestaurant={setLocationRestaurant}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageRestaurant(props) {
  const { imageRestaurant } = props;

  return (
    <View style={styles.viewPhoto}>
      {imageRestaurant ? (
        <Image
          source={{ uri: imageRestaurant }}
          style={{ width: WidthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: WidthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UploadImage(props) {
  const { imageSelected, setImageSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;
    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la camara, tienes que ir a configuracion de tu equipo y aceptar los permisos manualmente",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        spect: [4, 3]
      });
      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galeria sin seleccionar ninguna imagen",
          2000
        );
      } else {
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  const removeImage = image => {
    const arrayImages = imageSelected;
    Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro que quieres eliminar esta imagen",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImageSelected(arrayImages.filter(imageUrl => imageUrl !== image))
        }
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.viewImages}>
      {imageSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {imageSelected.map(imageRestaurant => (
        <Avatar
          key={imageRestaurant}
          onPress={() => removeImage(imageRestaurant)}
          style={styles.miniatureStyle}
          source={{ uri: imageRestaurant }}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  const {
    setRestaurantName,
    setRestaurantAddress,
    setRestaurantDescription,
    setIsvisibleMap,
    LocationRestaurant
  } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="nombre del retaurante"
        containerStyle={styles.input}
        onChange={e => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Direccion"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: LocationRestaurant ? "#00a680" : "#c2c2c2",
          onPress: () => setIsvisibleMap(true)
        }}
        onChange={e => setRestaurantAddress(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripcion del restaurante"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={e => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function Map(props) {
  const {
    isVisibleMap,
    setIsvisibleMap,
    setLocationRestaurant,
    toastRef
  } = props;

  const [location, setLocation] = useState(null);
  console.log(location);

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;
      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localizacion para crar un restaurante",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        });
      }
    })();
  }, []);

  const configLocation = () => {
    setLocationRestaurant(location);
    toastRef.current.show("Localizacion Guardada correctamente");
    setIsvisibleMap(false);
  };
  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsvisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar ubicacion"
            onPress={configLocation}
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
          />
          <Button
            title="Cancelar ubicacion"
            onPress={() => setIsvisibleMap(false)}
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 57,
    width: 57,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 57,
    height: 57,
    marginRight: 10
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  mapStyle: {
    width: "100%",
    height: 500
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },

  viewMapBtnSave: {
    backgroundColor: "#00a680"
  },

  viewMapBtnCancel: {
    paddingLeft: 5
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d"
  },
  btnAddRestaurante: {
    backgroundColor: "#00a680",
    margin: 20
  }
});
