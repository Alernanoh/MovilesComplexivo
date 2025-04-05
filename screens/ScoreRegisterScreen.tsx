import { Alert, Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { db, auth } from '../config/Config'; // Importa Firestore y Auth
import { addDoc, collection } from 'firebase/firestore'; // Métodos para agregar documentos
import { ref, set } from 'firebase/database';

export default function ScoreRegisterScreen({ navigation }: any) {
  const [game, setGame] = useState("");
  const [score, setScore] = useState("");
  const [date, setDate] = useState(""); // Fecha ingresada como texto
  const [dateError, setDateError] = useState(""); // Mensaje de error para la fecha

  function registerScore() {
    if (!game || !score) {
      Alert.alert("Error", "El nombre del juego y el puntaje son requeridos.");
      return;
    }

    if (+score < 0 || +score > 999999) {
      Alert.alert("Error", "El puntaje debe estar entre 0 y 999,999.");
      return;
    }

    if (date && !isValidDate(date)) {
      Alert.alert("Error", "La fecha debe estar en formato YYYY-MM-DD.");
      return;
    }

    const dateFormatted = date ? new Date(date).toISOString().split('T')[0] : null;

    const userId = auth.currentUser?.uid;

    if (!userId) {
      Alert.alert("Error", "Debes iniciar sesión para registrar un puntaje.");
      return;
    }

    const scoreRef = ref(db, `scores/${userId}/${Date.now()}`);

    set(scoreRef, {
      game: game.trim(),
      score: parseInt(score),
      date: dateFormatted,
    })
      .then(() => {
        Alert.alert("Éxito", "Puntaje registrado correctamente.");

        setGame("");
        setScore("");
        setDate("");
      })
      .catch((error) => {
        console.error("Error al registrar el puntaje:", error);
        Alert.alert("Error", "Ocurrió un error al registrar el puntaje.");
      });
  }

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const [year, month, day] = dateString.split('-').map(Number);
    const dateObject = new Date(year, month - 1, day);
    return (
      dateObject.getFullYear() === year &&
      dateObject.getMonth() + 1 === month &&
      dateObject.getDate() === day
    );
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          placeholder='Ingrese el nombre del juego'
          onChangeText={(texto) => setGame(texto)}
          value={game}
          style={styles.input}
          maxLength={100}
        />
        <TextInput
          placeholder='Ingrese el score obtenido'
          onChangeText={(texto) => setScore(texto)}
          value={score}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder='Ingrese la fecha (YYYY-MM-DD)'
          onChangeText={(texto) => {
            setDate(texto);
            setDateError("");
          }}
          value={date}
          style={[styles.input, dateError && styles.inputError]}
        />
        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
        <Button title='Registrar el Score' onPress={registerScore} />
      </View>
    </ImageBackground>
  );
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
  inputError: {
    borderColor: 'red',
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
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
});
