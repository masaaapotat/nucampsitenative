import Main from "./screens/MainComponents";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
  //   navigation container is used to manage our navigation and must wrap all our components using navigation
}
