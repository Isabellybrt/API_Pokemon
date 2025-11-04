import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchPokemonList, fetchPokemonDetailByUrl } from '../model/services/pokeService';
import { useNavigation } from '@react-navigation/native';

type Pokemon = {
  name: string;
  url: string;
  sprite?: string;
};

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const list = await fetchPokemonList();
        const detailedList = await Promise.all(
          list.map(async (p: Pokemon) => {
            const details = await fetchPokemonDetailByUrl(p.url);
            return { ...p, sprite: details.sprites.front_default };
          })
        );
        setPokemons(detailedList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadPokemons();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#ff0000" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { url: item.url })}
          >
            <Image source={{ uri: item.sprite }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 10 
  },
  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 10 
  },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 8, 
    padding: 10, 
    backgroundColor: '#f2f2f2', 
    borderRadius: 10 
  },
  image: { 
    width: 60,
    height: 60, 
    marginRight: 10 
  },
  name: { 
    fontSize: 18, 
    fontWeight: '500' 
  },
});
