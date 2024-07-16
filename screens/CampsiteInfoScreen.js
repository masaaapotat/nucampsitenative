import { FlatList, StyleSheet, Text, View, Button, Modal } from "react-native";
import { useState } from "react";
import RenderCampsite from "../features/campsites/RenderCampsites";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { Rating, Input } from "react-native-elements";
import { postComment } from "../features/comments/commentsSlice";

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

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const newComment = {
      rating,
      author,
      text,
      campsiteId: campsite.id,
    };
    dispatch(postComment(newComment));
    setShowModal(!showModal);
    resetForm();
  };

  // function to reset the form
  const resetForm = () => {
    setRating(5);
    setAuthor("");
    setText("");
  };

  // Function to render each comment item
  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Rating
          imageSize={10}
          startingValue={item.rating}
          readonly
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
        />
        <Text style={{ fontSize: 14 }}> {item.text}</Text>
        <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* FlatList component handles all the rendering of the page including the list comments */}
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
        // if you want to show a comment above or below a FlatList, use ListHeaderComponent or ListFooterComponent
        ListHeaderComponent={
          <>
            <RenderCampsite
              campsite={campsite}
              // Check if the campsite is in the favorites array
              isFavorite={favorites.includes(campsite.id)}
              // Dispatch action to toggle favorite status
              markFavorite={() => dispatch(toggleFavorite(campsite.id))}
              onShowModal={() => setShowModal(!showModal)}
            />
            <Text style={styles.commentsTitle}>Comments</Text>
          </>
        }
      />

      {/* Modal to show additional campsite information */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)} // Close the modal on request
      >
        <View style={styles.modal}>
          <Rating
            showRating
            startingValue={rating}
            imageSize={40}
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
          />
          <Input
            placeholder="Author"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(author) => setAuthor(author)}
            value={author}
          />
          <Input
            placeholder="Comment"
            leftIcon={{ type: "font-awesome", name: "comment-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <View style={{ margin: 10 }}>
            <Button
              color="#5637DD"
              title="Submit"
              onPress={handleSubmit}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              color="#808080"
              title="Cancel"
              onPress={() => {
                setShowModal(!showModal);
                resetForm(); // Reset the form
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
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
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default CampsiteInfoScreen;
