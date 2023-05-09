import { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import { Keyboard } from "react-native";
import CardPokemon from "../cardPokemon";
import { SearchBar } from "@rneui/themed";

export default function Busca({ navigation }) {
  const [searchValue, setSearchValue] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState([]);
  const [pokemonResultSearch, setPokemonResultSearch] = useState(null);

  function getPokemonNames() {
    if (pokemons.length == 0) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=10271")
        .then((response) => response.json())
        .then((data) => {
          const dados = [];
          data.results.forEach((p) => {
            dados.push({
              id: p.url.split("pokemon")[1].split("/")[1],
              nome: p.name,
            });
          });

          setPokemons(dados);
        })
        .catch((error) => {
          setPokemons([]);
        });
    }
  }

  function filtraPokemons() {
    setPokemonResultSearch(null);
    getPokemonNames();
    setPokemonsFiltrados(pokemons);

    if (searchValue != null || searchValue != undefined || searchValue != "") {
      const result = pokemons.filter((p) =>
        p.nome.includes(searchValue.toLowerCase())
      );

      setPokemonsFiltrados(result);
    }
  }

  function search(pokemon) {
    Keyboard.dismiss();

    setSearchValue(pokemon);

    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase())
      .then((response) => response.json())
      .then((data) => {
        setPokemonResultSearch(data);
      })
      .catch((error) => {
        setPokemonResultSearch(null);
        filtraPokemons();
      });
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Digite o nome do pokemon..."
        onChangeText={setSearchValue}
        onKeyPress={() => filtraPokemons()}
        lightTheme={true}
        value={searchValue}
      />

      {searchValue == null && pokemonsFiltrados.length == 0 ?<Text style={styles.msgInfo}>Faça a pesquisa de um pokémon inserido o nome dele na barra de pesquisa</Text> : null }

      {pokemonsFiltrados.length > 0 && pokemonResultSearch == null ? (
        <SafeAreaView style={styles.flatList}>
          <FlatList
            showsVerticalScrollIndicator={true}
            data={pokemonsFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchBtn}
                onPress={() => search(item.nome)}
              >
                <Text style={styles.pokemonName}>{item.nome}</Text>
                <FontAwesome name="search" size={24} color="#0076ff" />
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      ) : pokemonResultSearch != null ? (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Detalhes", {
              pokemon: pokemonResultSearch,
            })
          }
        >
          <CardPokemon
            name={pokemonResultSearch.name}
            imgUrl={
              pokemonResultSearch.sprites.other.home.front_shiny ||
              pokemonResultSearch.sprites.front_default
            }
            altura={pokemonResultSearch.height}
            peso={pokemonResultSearch.weight}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
