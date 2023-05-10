import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Keyboard } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./style";

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
          console.log(error);
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
        p.nome.includes(searchValue?.toLowerCase())
      );

      setPokemonsFiltrados(result);
    }
  }

  function clearSeachBar() {
    setSearchValue(null);
    setPokemonResultSearch(null);
    setPokemonsFiltrados(pokemons);
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
        console.log(error);
        setPokemonResultSearch(null);
        filtraPokemons();
      });
  }

  function showPokemonsNames() {
    getPokemonNames();
    setPokemonsFiltrados(pokemons);
  }

  return (
    <View style={styles.container}>
      {pokemonsFiltrados.length == 0 && searchValue == null ? (
        <View>
          <TouchableOpacity
            style={styles.showPokemonsBtn}
            onPress={() => showPokemonsNames()}
          >
            <Text style={styles.textShowPokemonsBtn}>Listar Pokémons</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <SearchBar
        platform="default"
        containerStyle={{ backgroundColor: "#fff", backgroundColor: "#fff" }}
        inputContainerStyle={{
          backgroundColor: "#fff",
          borderWidth: 2,
          borderColor: "red",
          borderBottomWidth: 2,
        }}
        placeholder="Digite o nome do pokemon..."
        onChangeText={setSearchValue}
        onKeyPress={() => filtraPokemons()}
        onClear={() => {
          clearSeachBar();
        }}
        round
        lightTheme
        value={searchValue}
      />

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

      {pokemonsFiltrados.length == 0 &&
      searchValue != null &&
      searchValue != "" ? (
        <View>
          <Text style={styles.msgInfo}>
            Não encontramos nenhum pokémon com o nome {searchValue}
          </Text>

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => clearSeachBar()}
          >
            <Text style={styles.textClearBtn}>Limpar pesquisa</Text>
            <FontAwesome name="close" size={24} color="#ff0000" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
