import { Alert, Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegisterScreen({ navigation }: any) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        navigation.navigate("Welcome");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
        // ..
      });
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a Nano Gaming</Text>
        <TextInput placeholder='Registre su correo'
          onChangeText={(texto) => setEmail(texto)}
          value={email}
          style={styles.input}
        />
        <TextInput placeholder='Registre su contraseña'
          onChangeText={(texto) => setPassword(texto)}
          value={password}
          style={styles.input}
        />
        <Button title='Registrarse' onPress={() => register()} />

        <Text style={styles.cuenta}> ¿Ya estás registrado?
          <Text style={styles.registro} onPress={() => navigation.navigate("Welcome")}> Inicia Sesión</Text>
        </Text>
      </View>
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: '#FF5C8D',
    borderRadius: 8,
    padding: 12,
    fontSize: 19,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    color: 'black',
  },
  registro: {
    color: '#FFE400',
    textDecorationLine: 'underline',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cuenta: {
    fontSize: 18,
    color: '#D3D3D3',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFE400', // Amarillo brillante
    marginBottom: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
})

