import { Animated, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../components/LoadingComponent";

// Component to display a featured item with loading and error handling
const FeaturedItem = (props) => {
  const { item } = props; // Destructure item from props

  // Display loading component if data is being fetched
  if (props.isLoading) {
    return <Loading />;
  }
  // Display error message if there is an error
  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  // Display the featured item if data is available
  if (item) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <Card.Image source={{ uri: baseUrl + item.image }}>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
          </View>
        </Card.Image>
        <Text style={{ margin: 20 }}>{item.description}</Text>
      </Card>
    );
  }
  // Return an empty view if no item is provided
  return <View />;
};

// Main HomeScreen component that displays featured campsite, promotion, and partner
const HomeScreen = () => {
  // Retrieve data from the Redux store using useSelector hook
  const campsites = useSelector((state) => state.campsites);
  const promotions = useSelector((state) => state.promotions);
  const partners = useSelector((state) => state.partners);

  // Use useRef to create a reference for the animation value
  const scaleValue = useRef(new Animated.Value(0)).current;

  // Define the scale animation
  const scaleAnimation = Animated.timing(scaleValue, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  });

  // Find the featured items from the arrays
  const featCampsite = campsites.campsitesArray.find((item) => item.featured);
  const featPromotion = promotions.promotionsArray.find(
    (item) => item.featured
  );
  const featPartner = partners.partnersArray.find((item) => item.featured);

  // Use useEffect to start the animation when the component mounts
  useEffect(() => {
    scaleAnimation.start();
  }, []);

  // Render the featured items inside a scrollable view
  return (
    <Animated.ScrollView style={{ transform: [{ scale: scaleValue }] }}>
      <FeaturedItem
        item={featCampsite}
        isLoading={campsites.isLoading}
        errMess={campsites.errMess}
      />
      <FeaturedItem
        item={featPromotion}
        isLoading={promotions.isLoading}
        errMess={promotions.errMess}
      />
      <FeaturedItem
        item={featPartner}
        isLoading={partners.isLoading}
        errMess={partners.errMess}
      />
    </Animated.ScrollView>
  );
};

export default HomeScreen;
