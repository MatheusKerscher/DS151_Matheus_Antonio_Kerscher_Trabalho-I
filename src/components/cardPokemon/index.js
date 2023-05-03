import { View, Text, Image } from "react-native";
import styles from "./style";

export default function CardPokemon(props) {
  function titleCase(name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  return (
    <View style={styles.card}>
      <View style={styles.pokemonImage}>
        <Image
          style={styles.image}
          source={{
            uri: props.imgUrl,
          }}
        />
      </View>

      <View style={styles.pokemonName}>
        <Text style={styles.name}>{titleCase(props.name)}</Text>

        <Text style={styles.infos}>
          <Text style={styles.destaque}>Altura:</Text>{" "}
          {(props.altura * 10) / 100}m
        </Text>

        <Text style={styles.infos}>
          <Text style={styles.destaque}>Peso:</Text> {(props.peso * 10) / 100}kg
        </Text>
      </View>
    </View>
  );
}
