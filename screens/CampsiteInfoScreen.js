import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import RenderCampsite from "../features/campsites/RenderCampsites";
import { useSelector } from "react-redux";
const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;
  const comments = useSelector((state) => state.comments);

  // state variable to track if the campsite is marked as a favorite
  const [favorite, setFavorite] = useState(false);
  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontSize: 14 }}> {item.text}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    );
  };
  return (
    // flatlist component handles all the rendering of the page inluding the list comments

    <FlatList
      data={comments.commentsArray.filter(
        // getting the campsite id from our route prop
        (comment) => comment.campsiteId === campsite.id
      )}
      renderItem={renderCommentItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        marginHorizontal: 20,
        paddingVertical: 20,
      }}
      // if you want to show a comment above or below a flatlist, use listheader or listfootercomponent
      ListHeaderComponent={
        <>
          <RenderCampsite campsite={campsite}
            isFavorite={favorite}
            markFavorite={() => setFavorite(true)} />

          <Text style={styles.commentsTitle}>Comments</Text>
        </>
      }
    />
  );
};
const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});

export default CampsiteInfoScreen;
