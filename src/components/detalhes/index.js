import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native";
import styles from "./style";

export default function Detalhes({ route }) {
  function titleCase(name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={{
          uri:
            route.params?.pokemon?.sprites?.other?.home?.front_shiny ||
            route.params?.pokemon?.sprites?.front_default,
        }}
      />
      <Text style={styles.title}>{titleCase(route.params?.pokemon?.name)}</Text>

      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <Text style={styles.destaque}>Tipo: </Text>
        {route?.params?.pokemon?.types.map((t, i) => (
          <Text style={styles.text} key={i}>
            {titleCase(t?.type?.name)}
            {route?.params?.pokemon?.types?.length == i + 1 ? "." : ", "}
          </Text>
        ))}
      </View>

      <Text style={styles.text}>
        <Text style={styles.destaque}>Altura: </Text>
        {(route.params?.pokemon?.weight * 10) / 100}m
      </Text>

      <Text style={styles.text}>
        <Text style={styles.destaque}>Peso: </Text>
        {(route.params?.pokemon?.height * 10) / 100}kg
      </Text>

      <Text style={styles.text}>
        <Text style={styles.destaque}>Espécie: </Text>
        {titleCase(route.params?.pokemon?.species?.name)}
      </Text>

      <ScrollView style={styles.typesContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Text style={styles.destaque}>Golpes: </Text>
          {route.params?.pokemon?.moves?.map((m, i) => (
            <Text style={styles.text} key={i}>
              {titleCase(m?.move?.name)}
              {i + 1 == route.params?.pokemon?.moves?.length ? "." : ", "}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
