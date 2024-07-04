import React from "react";
import { Platform, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import { createStackNavigator } from "@react-navigation/stack";

// functional component to return our stacknavigator code for directory and campsite info screens
const DirectoryNavigator = () => {
  const Stack = createStackNavigator();

return (
  // returning our navigator code
  <Stack.Navigator
    //   default route when the navigator first loads
    initalRouteName="Directory"
    // defines the look and feel of the nav header
    screenOptions={{
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
    }}
  >
    <Stack.Screen
      // name of the screen
      name="Directory"
      // component incharge of displaying the directory screen
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
        // set the title of the campsite scree to the name of the specific campsite
        title: route.params.campsite.name,
      })}
    />
  </Stack.Navigator>
  
);
};
const Main = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}
        >
            <DirectoryNavigator />
        </View>
    );
};

export default Main;
