import { ActivityIndicator, Image, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApiResponse, Videojuegos } from '../config/Types';


export default function InfoScreen() {

  const [games, setGames] = useState<Videojuegos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jritsqmet.github.io/web-api/videojuegos.json');

        const data: ApiResponse = await response.json();
        setGames(data.videojuegos);
      } catch (err) {
        setError("Error al cargar los datos");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5C8D" />
        <Text style={styles.loadingText}>Cargando videojuegos.</Text>
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>
  }


  return (
    <FlatList
      data={games}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imagen }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text>Precio: ${item.precio.toFixed(2)}</Text>
            <Text>Plataforma: {item.plataformas}</Text>
          </View>
        </View>
      )}
    />
  );
};



const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 16,
  },
  precio: {
    marginTop: 5,
    fontSize: 16,
    color: "#FF5C8D",
  },
  plataformas: {
    marginTop: 5,
    fontSize: 14,
    color: "#D3D3D3",
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  }
});
