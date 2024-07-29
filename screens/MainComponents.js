import { Image, Text, Platform, StyleSheet, View, Alert, ToastAndroid } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import { Icon } from "react-native-elements";
import logo from "../assets/images/logo.png";
import ReservationScreen from "./ReservationScreen";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPartners } from "../features/partners/partnersSlice";
import { fetchCampsites } from "../features/campsites/campsitesSlice";
import { fetchPromotions } from "../features/promotions/promotionsSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import FavoriteScreen from "./FavoriteScreen";
import LoginScreen from "./LoginScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';
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
    <Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
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
// login stack navigator component
const LoginNavigator = () => {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={({ navigation, route }) => ({
                headerTitle: getFocusedRouteNameFromRoute(route),


                  // title: 'Login',
                  headerLeft: () => (
                      <Icon
                          name= {
                            getFocusedRouteNameFromRoute(route) === 
                            'Register' ? 'user-plus' : 'sign-in'
                          }
                          type='font-awesome'
                          iconStyle={styles.stackIcon}
                          onPress={() => navigation.toggleDrawer()}
                      />
                  )
              })}
          />
      </Stack.Navigator>
  );
}
// Reservation stack navigator component
const ReservationNavigator = () => {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
              name='Reservation'
              component={ReservationScreen}
              options={({ navigation }) => ({
                  title: 'Reservation Search',
                  headerLeft: () => (
                      <Icon
                          name='tree'
                          type='font-awesome'
                          iconStyle={styles.stackIcon}
                          onPress={() => navigation.toggleDrawer()}
                      />
                  )
              })}
          />
      </Stack.Navigator>
  );
};

const FavoritesNavigator = () => {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
              name='Favorites'
              component={FavoriteScreen}
              options={({ navigation }) => ({
                  title: 'Favorite campsites',
                  headerLeft: () => (
                      <Icon
                          name='heart'
                          type='font-awesome'
                          iconStyle={styles.stackIcon}
                          onPress={() => navigation.toggleDrawer()}
                      />
                  )
              })}
          />
      </Stack.Navigator>
  );
};
// Custom drawer content component
const customDrawerContent = (props) => {
  return (
    // Displays the content inside the drawer into a scrollable container
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={logo} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>NuCamp</Text>
        </View>
      </View>
      {/* Displays all the links that were previously in the drawer */}
      <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
    </DrawerContentScrollView>
  );
};

// Main component that sets up the drawer navigator
const Main = () => {
  const dispatch = useDispatch();
// Using dispatch to dispatch actions
  useEffect(() => {
    // Dispatch fetchCampsites action
      dispatch(fetchCampsites());
      dispatch(fetchPromotions());
      dispatch(fetchPartners());
      dispatch(fetchComments());
  }, [dispatch]); // Dependencies for useEffect


 // Async function to fetch network information and show initial connectivity type
 const showNetInfo = async () => {
  const connectionInfo = await NetInfo.fetch();
  Platform.OS === 'ios'
    ? Alert.alert('Initial Network Connectivity Type:', connectionInfo.type)
    : ToastAndroid.show(
      'Initial Network Connectivity Type: ' + connectionInfo.type,
      ToastAndroid.LONG
    );
};

useEffect(() => {
  showNetInfo();

  const unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
    handleConnectivityChange(connectionInfo);
  });

  return unsubscribeNetInfo;
}, []);

// Function to handle network connectivity change event
const handleConnectivityChange = (connectionInfo) => {
  let connectionMsg = 'You are now connected to an active network.';
  switch (connectionInfo.type) {
    case 'none':
      connectionMsg = 'No network connection is active.';
      break;
    case 'unknown':
      connectionMsg = 'The network connection state is now unknown.';
      break;
    case 'cellular':
      connectionMsg = 'You are now connected to a cellular network';
      break;
    case 'wifi':
      connectionMsg = 'You are now connected to a WiFi network.';
      break;
  }

  Platform.OS === 'ios'
    ? Alert.alert('Connection change:', connectionMsg)
    : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
};
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
   

      <Drawer.Navigator
        initialRouteName="Home"
        // Tells the DrawerNavigator to use the custom drawer content to render the drawer
        drawerContent={customDrawerContent}
        drawerStyle={{ backgroundColor: "#CEC8FF" }}
      >
           {/* drawer for login */}
           <Drawer.Screen
          name="Login"
          component={LoginNavigator}
          // Customizing the drawer icon for the Login screen
          options={{
            
            drawerIcon: ({ color }) => (
              <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),

          }}
        />
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
          name="Reserve Campsite"
          component={ReservationNavigator}
          // Customizing the drawer icon for the About screen
          options={{
            title: "Reserve Campsite",
            drawerIcon: ({ color }) => (
              <Icon
                name="tree"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Favorites"
          component={FavoritesNavigator}
          // Customizing the drawer icon for the Favorites screen
          options={{
            title: "My Favorites",
            drawerIcon: ({ color }) => (
              <Icon
                name="heart"
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

// Styles for the stack icon and drawer content
const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#5637DD",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;
