import { useDispatch, useSelector } from 'react-redux';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

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
                        // Dispatch toggleFavorite action to remove campsite from favorites
                        onPress={() => dispatch(toggleFavorite(campsite.id))}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem
                        // Navigate to CampsiteInfo screen with the selected campsite's details
                        onPress={() =>
                            navigation.navigate('Directory', {
                                screen: 'CampsiteInfo',
                                params: { campsite }
                            })
                        }
                    >
                        {/* Display campsite image as an avatar */}
                        <Avatar
                            rounded
                            source={{ uri: baseUrl + campsite.image }}
                        />
                        <ListItem.Content>
                            {/* Display campsite name */}
                            <ListItem.Title>{campsite.name}</ListItem.Title>
                            {/* Display campsite description */}
                            <ListItem.Subtitle>
                                {campsite.description}
                            </ListItem.Subtitle>
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
    );
};

// Styles for the component
const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default FavoritesScreen;
