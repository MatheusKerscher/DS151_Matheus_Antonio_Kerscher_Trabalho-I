import { createStackNavigator } from "@react-navigation/stack";
import Busca from "./src/components/busca";
import Detalhes from "./src/components/detalhes";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokédex" component={Busca} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}