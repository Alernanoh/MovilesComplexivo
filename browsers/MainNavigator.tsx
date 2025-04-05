import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import ScoreScreen from "../screens/ScoreScreen";
import ScoreRegisterScreen from "../screens/ScoreRegisterScreen";
import InfoScreen from "../screens/InfoScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Drawer" component={MyDrawer} />
    </Stack.Navigator>
  )
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ScoreScreen" component={ScoreScreen} />
      <Drawer.Screen name="ScoreRegisterScreen" component={ScoreRegisterScreen} />
      <Drawer.Screen name="InfoScreen" component={InfoScreen} />
    </Drawer.Navigator>
  )
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

  )
}
