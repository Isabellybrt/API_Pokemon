import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { fetchPokemonDetailByUrl } from '../model/services/pokeService';

type Params = {
  Details: {
    url: string;
  };
};

type PokemonDetailModel = {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
};

export default function DetailsScreen() {
  const route = useRoute<RouteProp<Params, 'Details'>>();
  const [pokemon, setPokemon] = useState<PokemonDetailModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemonDetailByUrl(route.params.url);
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadPokemon();
  }, [route.params.url]);

  if (loading) return <ActivityIndicator size="large" color="#ff0000" style={{ marginTop: 50 }} />;

  if (!pokemon) return <Text>Pokémon não encontrado.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.text}>Altura: {pokemon.height}</Text>
        <Text style={styles.text}>Peso: {pokemon.weight}</Text>
        <Text style={styles.text}>Tipos: {pokemon.types.map(t => t.type.name).join(', ')}</Text>
        <Text style={styles.text}>Habilidades: {pokemon.abilities.map(a => a.ability.name).join(', ')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 10 
  },
  image: { 
    width: 150, 
    height: 150, 
    alignSelf: 'center' 
  },
  info: {
    marginTop: 20 
  },
  text: { 
    fontSize: 16, 
    marginBottom: 8 
  },
});
