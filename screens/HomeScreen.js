import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

// FeaturedItem component displays the featured item passed as a prop
const FeaturedItem = ({ item }) => {
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                {/* Display the image of the item */}
                <Card.Image source={{ uri: baseUrl + item.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        {/* Display the name of the item */}
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                {/* Display the description of the item */}
                <Text style={{ margin: 20 }}>{item.description}</Text>
            </Card>
        );
    }
    // Return an empty view if no item is provided
    return <View />;
};

// HomeScreen component displays the featured campsite, promotion, and partner
const HomeScreen = () => {
    // Select data from the Redux store
    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);

    // Display loading text while data is being fetched
    if (campsites.isLoading || promotions.isLoading || partners.isLoading) {
        return <Text>Loading...</Text>;
    }

    // Display error message if any fetch request fails
    if (campsites.errMess || promotions.errMess || partners.errMess) {
        return <Text>{campsites.errMess || promotions.errMess || partners.errMess}</Text>;
    }

    // Find the featured campsite, promotion, and partner
    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find((item) => item.featured);
    const featPartner = partners.partnersArray.find((item) => item.featured);

    // Render the featured items in a scrollable view
    return (
        <ScrollView>
            <FeaturedItem item={featCampsite} />
            <FeaturedItem item={featPromotion} />
            <FeaturedItem item={featPartner} />
        </ScrollView>
    );
};

export default HomeScreen;
