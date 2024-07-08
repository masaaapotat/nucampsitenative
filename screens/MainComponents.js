import React from "react";
import { Platform, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";

const Drawer = createDrawerNavigator();
const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#5637DD",
  },
};  

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: "Home" }} 
      />
    </Stack.Navigator>
  );
};

// functional component to return our stacknavigator code for directory and campsite info screens
const DirectoryNavigator = () => {
  // hold the object from stacknavigator
  // returns screen and navigator which are both react components 
  const Stack = createStackNavigator();

  return (
    // returning our navigator code
    <Stack.Navigator
      // default route when the navigator first loads
      initialRouteName="Directory"
      // defines the look and feel of the nav header
      screenOptions={screenOptions}
    >
      <Stack.Screen
        // name of the screen
        name="Directory"
        // component in charge of displaying the directory screen
        component={DirectoryScreen}
        // title to be displayed in the navigation header
        options={{ title: "Campsite Directory" }}
      />
      {/* screen for campsite info */}
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        // set to a function that return an object
        options={({ route }) => ({
          // set the title of the campsite screen to the name of the specific campsite
          title: route.params.campsite.name,
        })}
      />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="About"
        component={AboutScreen}
        
      />
    </Stack.Navigator>
  );
};
 const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: "Contact Us" }}
      />
    </Stack.Navigator>
  );
 }

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop:
          Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
      }}
    >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ backgroundColor: '#CEC8FF' }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeNavigator}
          options={{ title: "Home" }} 
        />
        <Drawer.Screen 
          name="Directory" 
          component={DirectoryNavigator}
          options={{ title: "Directory" }} 
        />
        <Drawer.Screen 
          name="About" 
          component={AboutNavigator}
        />
        <Drawer.Screen 
          name="Contact" 
          component={ContactNavigator}
          options={{ title: "Contact Us" }}
        />
      </Drawer.Navigator>
      
    </View>
  );
};

export default Main;
