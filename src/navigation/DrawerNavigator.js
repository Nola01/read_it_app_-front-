import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, Image } from "react-native";
import { Drawer } from 'react-native-paper';

const LeftDrawerNavigator = () => {
  const drawer = useRef(null);
  const [active, setActive] = React.useState('');
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };

  const navigationView = () => (
    <View>
        <Drawer.Section title="¡Bienvenido!">
        <Drawer.Item
            label="Itinerarios"
            icon="star"
            active={active === 'first'}
            onPress={() => setActive('first')}
        />
        <Drawer.Item
            label="Mis libros"
            icon="book"
            active={active === 'second'}
            onPress={() => setActive('second')}
        />
        <Drawer.Item
            label="Mi perfil"
            active={active === 'second'}
            onPress={() => setActive('second')}
        />
        <Drawer.Item
            label="Cerrar sesión"
            icon="logout"
            active={active === 'second'}
            onPress={() => setActive('second')}
        />
        <Image
            style={styles.logo}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../assets/logo.png')}
        />
        </Drawer.Section>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          ¿Qué vas a leer hoy?
        </Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});

export default LeftDrawerNavigator;