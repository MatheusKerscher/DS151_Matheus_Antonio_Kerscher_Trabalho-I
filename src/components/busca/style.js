import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  searchBtn: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
    height: 50,
    marginBottom: 10,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginHorizontal: 15,
    borderRadius: 10
  },

  flatList: {
    height: "70%",
    marginTop: 20,
  },

  pokemonName: {
    fontSize: 20,
    color: "#0076ff",
  },

  card: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },

  msgInfo: {
    fontSize: 20,
    textAlign: "center",
    color: '#aaa',
    marginVertical: 10,
  },

  clearBtn: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
    height: 50,
    marginBottom: 10,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginHorizontal: 15,
    borderRadius: 10
  },

  textClearBtn: {
    fontSize: 20,
    color: "#ff0000",
  },

  showPokemonsBtn: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "red",
    height: 50,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    marginHorizontal: 15,
    borderRadius: 10
  },

  textShowPokemonsBtn: {
    fontSize: 20,
    color: "#fff",
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default styles;
