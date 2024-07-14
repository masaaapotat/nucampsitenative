import { FlatList, StyleSheet, Text, View } from "react-native";
import RenderCampsite from "../features/campsites/RenderCampsites";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

// Component to display campsite information and associated comments
const CampsiteInfoScreen = ({ route }) => {
  // Destructure campsite from route params
  const { campsite } = route.params;
  // Get comments from the Redux store
  const comments = useSelector((state) => state.comments);

  // Get favorite campsites from the Redux store
  const favorites = useSelector((state) => state.favorites);
  // Use dispatch to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to render each comment item
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
    // FlatList component handles all the rendering of the page including the list comments
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
          <RenderCampsite 
            campsite={campsite}
            // Check if the campsite is in the favorites array
            isFavorite={favorites.includes(campsite.id)}
            // Dispatch action to toggle favorite status
            markFavorite={() => dispatch(toggleFavorite(campsite.id))} 
          />
          <Text style={styles.commentsTitle}>Comments</Text>
        </>
      }
    />
  );
};

// Styles for the component
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
