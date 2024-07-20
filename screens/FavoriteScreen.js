import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Loading from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { SwipeRow } from "react-native-swipe-list-view";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

const FavoritesScreen = ({ navigation }) => {
  // Extracting campsites data, loading state, and error message from Redux store
  const { campsitesArray, isLoading, errMess } = useSelector(
    (state) => state.campsites
  );

  // Extracting favorite campsite IDs from Redux store
  const favorites = useSelector((state) => state.favorites);

  // Use dispatch to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to render each favorite campsite item
  const renderFavoriteItem = ({ item: campsite }) => {
    return (
      // Using SwipeRow to enable swipe-to-delete functionality
      <SwipeRow rightOpenValue={-100}>
        <View style={styles.deleteView}>
          {/* TouchableOpacity to handle delete action */}
          <TouchableOpacity
            style={styles.deleteTouchable}
            // alert to confirm deletion
            onPress={() =>
              Alert.alert(
                // Title displayed on the alert dialogue
                "Delete Favorite?",
                // Message displayed on the alert dialogue
                "Are you sure you wish to delete the favorite campsite " +
                  campsite.name +
                  "?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Not Deleted"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => dispatch(toggleFavorite(campsite.id)),
                  },
                ],
                // cancelable property sets whether the alert can be dismissed by tapping outside it, set to false to ensure the user presses on either buttons
                { cancelable: false }
              )
            }
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ListItem
            // Navigate to CampsiteInfo screen with the selected campsite's details
            onPress={() =>
              navigation.navigate("Directory", {
                screen: "CampsiteInfo",
                params: { campsite },
              })
            }
          >
            {/* Display campsite image as an avatar */}
            <Avatar rounded source={{ uri: baseUrl + campsite.image }} />
            <ListItem.Content>
              {/* Display campsite name */}
              <ListItem.Title>{campsite.name}</ListItem.Title>
              {/* Display campsite description */}
              <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      </SwipeRow>
    );
  };

  // Display loading component if data is still loading
  if (isLoading) {
    return <Loading />;
  }

  // Display error message if there is an error
  if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  }

  // Render the list of favorite campsites
  return (
    <Animatable.View animation="fadeInRightBig" duration={2000}>
      <FlatList
        // Filter the campsites array to only include favorite campsites
        data={campsitesArray.filter((campsite) =>
          favorites.includes(campsite.id)
        )}
        // Render each favorite campsite item
        renderItem={renderFavoriteItem}
        // Key extractor to provide unique keys for each item
        keyExtractor={(item) => item.id.toString()}
      />
    </Animatable.View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  deleteView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  deleteTouchable: {
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
    width: 100,
  },
});

export default FavoritesScreen;
