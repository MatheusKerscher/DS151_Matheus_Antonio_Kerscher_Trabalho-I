import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  pokemonImage: {
    width: "40%",
  },

  pokemonName: {
    width: "60%",
  },

  image: {
    width: "100%",
    height: 150,
    resizeMode: "stretch",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },

  infos: {
    fontSize: 15,
    marginLeft: 5,
  },

  destaque: {
    fontWeight: "600"
  }
});

export default styles;
