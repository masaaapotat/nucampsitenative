import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";

// RenderCampsite component receives props
const RenderCampsite = (props) => {
  // Destructure the campsite object from props
  const { campsite } = props;

  // If campsite is provided, render the campsite details
  if (campsite) {
    return (
      <Card containerStyle={styles.cardContainer}>
        {/* Display the campsite image */}
        <Card.Image source={{uri: baseUrl + campsite.image}}>
          {/* Overlay text on the image */}
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {campsite.name}
            </Text>
          </View>
        </Card.Image>
        {/* Display the campsite description */}
        <Text style={{ margin: 20 }}>{campsite.description}</Text>
        {/* Favorite icon with onPress handling */}
        <Icon
          name={props.isFavorite ? "heart" : "heart-o"}
          type="font-awesome"
          color={"#f50"}
          raised
          reverse
          onPress={() =>
            props.isFavorite
              ? console.log("already favorite")
              : props.markFavorite(campsite.id)
          }
        />
      </Card>
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
});

export default RenderCampsite;
