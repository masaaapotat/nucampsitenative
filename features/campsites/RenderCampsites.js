import React from "react";
import { StyleSheet, Text, View, PanResponder, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";
import * as Animatable from "react-native-animatable";

// RenderCampsite component receives props
const RenderCampsite = (props) => {
  // Destructure the campsite object from props
  const { campsite } = props;

  // Function to check if swipe is a left swipe
  const isLeftSwipe = ({ dx }) => dx < -200;

  // Create PanResponder to handle swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState.dx);
      if (isLeftSwipe(gestureState)) {
        Alert.alert(
          "Add Favorite?",
          "Are you sure you wish to add the favorite campsite " + campsite.name + "?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () =>
                props.isFavorite
                  ? console.log("Already favorite")
                  : props.markFavorite(campsite.id),
            },
          ],
          { cancelable: false }
        );
      }
    },
  });

  // If campsite is provided, render the campsite details
  if (campsite) {
    return (
      // Animatable View with PanResponder
      <Animatable.View
        animation="fadeInDownBig"
        duration={2000}
        delay={1000}
        {...panResponder.panHandlers}
      >
        {/* Card component */}
        <Card containerStyle={styles.cardContainer}>
          {/* Display the campsite image */}
          <Card.Image source={{ uri: baseUrl + campsite.image }}>
            {/* Overlay text on the image */}
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={styles.cardText}>{campsite.name}</Text>
            </View>
          </Card.Image>
          {/* Display the campsite description */}
          <Text style={{ margin: 20 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
            {/* Favorite icon with onPress handling */}
            <Icon
              name={props.isFavorite ? "heart" : "heart-o"}
              type="font-awesome"
              color={"#f50"}
              raised
              reverse
              onPress={() =>
                props.isFavorite
                  ? console.log("Already favorite")
                  : props.markFavorite(campsite.id)
              }
            />
            <Icon
              name="pencil"
              type="font-awesome"
              color={"#5637DD"}
              raised
              reverse
              onPress={props.onShowModal}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }

  // Return an empty view if no campsite is provided
  return <View />;
};

// Styles for the card container
const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardText: {
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});

export default RenderCampsite;
