import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function Loading() {
    return (
        <View style={StyleSheets.loadingView}>
            {/* spinig circle image */}
           <ActivityIndicator size='large' color='#5637DD' />
           <Text style={StyleSheets.loadingText}>Loading . . .</Text>
        </View>
    )
}
const StyleSheets = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        color: '#5637DD',
        fontSize: 14,
        fontWeight: 'bold'

    }
    
})
export default Loading