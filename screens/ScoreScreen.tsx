import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/Config';
import { get, ref } from 'firebase/database';
import { sum } from 'firebase/firestore';

export default function ScoreScreen() {
  const [totalScore, setTotalScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [globalTotal, setGlobalTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      setLoading(false);
      console.error("Usuario no autentiado.")
      return;
    }

    const userScoresRef = ref(db, `scores/${userId}`);

    get(userScoresRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          setLoading(false);
          console.log("No hay puntajes registrados.");
          return;
        }

        const scoresData = Object.values(snapshot.val()).map((item: any) => item.score);

        const total = scoresData.reduce((sum, score) => sum + score, 0);

        const highest = Math.max(...scoresData);

        const average = total / scoresData.length;

        setTotalScore(total);
        setHighestScore(highest);
        setAverageScore(average);

        const globalScoresRef = ref(db, `scores`);

        return get(globalScoresRef);
      })
      .then((globalSnapshot) => {
        if (!globalSnapshot?.exists()) {
          setLoading(false);
          console.log("No hay puntajes globales registrados.")
          return;
        }

        const globalScoresData = Object.values(globalSnapshot.val())
          .flatMap((user: any) => Object.values(user).map((item: any) => item.score));

        const globalTotal = globalScoresData.reduce((sum, score) => sum + score, 0);

        setGlobalTotal(globalTotal);
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.background}>
        <View >
          <Text style={styles.title}>Estadísticas de Puntajes</Text>

          <Text style={styles.stat}>Puntaje Total: {totalScore.toLocaleString()}</Text>

          <Text style={styles.stat}>Puntaje Más Alto: {highestScore.toLocaleString()}</Text>

          <Text style={styles.stat}>Puntaje Promedio: {averageScore.toFixed(2)}</Text>

          <Text style={styles.stat}> Total Acumulado Global: {globalTotal.toLocaleString()}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadngText: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFE400",
    textAlign: "center",
    marginBottom: 20,
  },
  stat: {
    fontSize: 18,
    color: "yellow",
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 10,
    padding: 15
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
