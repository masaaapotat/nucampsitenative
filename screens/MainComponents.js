import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import { Icon } from "react-native-elements";

// Create the drawer navigator
const Drawer = createDrawerNavigator();

// Define screen options for stack navigators
const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#5637DD",
  },
};

// Home stack navigator component
const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // Customizing the header with a left icon to open the drawer
        options={({ navigation }) => ({
          title: "Home",
          headerLeft: () => (
            <Icon
              name="home"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

// Directory stack navigator component
const DirectoryNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Directory"
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        // Customizing the header with a left icon to open the drawer
        options={({ navigation }) => ({
          title: "Campsite Directory",
          headerLeft: () => (
            <Icon
              name="list"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        // Dynamically setting the title of the screen based on the selected campsite
        options={({ route }) => ({
          title: route.params.campsite.name,
        })}
      />
    </Stack.Navigator>
  );
};

// About stack navigator component
const AboutNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="About" screenOptions={screenOptions}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        // Customizing the header with a left icon to open the drawer
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="info-circle"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

// Contact stack navigator component
const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Contact" screenOptions={screenOptions}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        // Customizing the header with a left icon to open the drawer
        options={({ navigation }) => ({
          title: "Contact Us",
          headerLeft: () => (
            <Icon
              name="address-card"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

// Main component that sets up the drawer navigator
const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ backgroundColor: "#CEC8FF" }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          // Customizing the drawer icon for the Home screen
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          // Customizing the drawer icon for the Directory screen
          options={{
            title: "Campsite Directory",
            drawerIcon: ({ color }) => (
              <Icon
                name="list"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutNavigator}
          // Customizing the drawer icon for the About screen
          options={{
            title: "About",
            drawerIcon: ({ color }) => (
              <Icon
                name="info-circle"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactNavigator}
          // Customizing the drawer icon for the Contact screen
          options={{
            title: "Contact Us",
            drawerIcon: ({ color }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

// Styles for the stack icon
const styles = StyleSheet.create({
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;
