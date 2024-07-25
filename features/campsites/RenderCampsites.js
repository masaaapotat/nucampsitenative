import React from "react";
import { useRef } from "react";
import { StyleSheet,Share, Text, View, PanResponder, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";
import * as Animatable from "react-native-animatable";

// RenderCampsite component receives props
const RenderCampsite = (props) => {
  // Destructure the campsite object from props
  const { campsite } = props; 
 // Create a reference for the Animatable.View
 const view = useRef();
  // Function to check if the gesture is a left swipe
  const isLeftSwipe = ({ dx }) => dx < -200;

  // Function to check if the gesture is a right swipe
  const isRightSwipe = ({ dx }) => dx > 200;

  // Create PanResponder to handle swipe gestures
  const panResponder = PanResponder.create({
    onPanResponderGrant: () => {
      // Animates the view when the pan responder is granted
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "cancelled")
        );
    },
   // Enables the pan responder
   onStartShouldSetPanResponder: () => true, 
    onPanResponderEnd: (e, gestureState) => {
      // Handle the end of the pan responder gesture
      console.log("pan responder end", gestureState.dx);
      if (isLeftSwipe(gestureState)) {
        // If it's a left swipe, show an alert to add the campsite to favorites
        Alert.alert(
          "Add Favorite?",
          "Are you sure you wish to add the favorite campsite " +
            campsite.name +
            "?",
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
      } else if (isRightSwipe(gestureState)) {
        // If it's a right swipe, show the comment form modal
        props.onShowModal();
      }
    },
  });

  const shareCampsite = (title, message, url) => {
    Share.share(
      {
        title,
        message: `${title}: ${message} ${url}`,
        url,
      },
      {
        dialogTitle: "Share " + title,
      }
    )
  }

  // If a campsite is provided, render the campsite details
  if (campsite) {
    return (
      // Animatable View with PanResponder
      <Animatable.View
        animation="fadeInDownBig"
        duration={2000}
        delay={1000}
        ref={view}
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
            {/* Pencil icon to show comment form modal */}
            <Icon
              name="pencil"
              type="font-awesome"
              color={"#5637DD"}
              raised
              reverse
              onPress={props.onShowModal}
            />
            {/* Share icon to share the campsite */}
            <Icon
              name="share"
              type="font-awesome"
              color={"#5637DD"}
              raised
              reverse
              onPress={() => shareCampsite(
                campsite.name, 
                campsite.description, 
                baseUrl + campsite.image)}
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
