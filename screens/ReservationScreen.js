import { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Switch,
    Button,
    Platform,
    Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// ReservationScreen component to handle campsite reservations
const ReservationScreen = () => {
    // State variables for number of campers, hike-in preference, selected date, calendar visibility, and modal visibility
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Function to handle date change event from DateTimePicker
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios'); // Hide calendar after selecting a date on non-iOS platforms
        setDate(currentDate); // Update date state
    };

    // Function to handle reservation submission
    const handleReservation = () => {
        // Log the reservation details
        console.log('campers:', campers);
        console.log('hikeIn:', hikeIn);
        console.log('date:', date);
        setShowModal(!showModal); // Show the modal with reservation details
    };

    // Function to reset the form to default values
    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    return (
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Campers:</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={campers}
                    onValueChange={(itemValue) => setCampers(itemValue)} // Update campers state
                >
                    <Picker.Item label='1' value={1} />
                    <Picker.Item label='2' value={2} />
                    <Picker.Item label='3' value={3} />
                    <Picker.Item label='4' value={4} />
                    <Picker.Item label='5' value={5} />
                    <Picker.Item label='6' value={6} />
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Hike In?</Text>
                <Switch
                    style={styles.formItem}
                    value={hikeIn}
                    trackColor={{ true: '#5637DD', false: null }}
                    onValueChange={(value) => setHikeIn(value)} // Update hikeIn state
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date:</Text>
                <Button
                    onPress={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
                    title={date.toLocaleDateString('en-US')} // Display selected date
                    color='#5637DD'
                    accessibilityLabel='Tap me to select a reservation date'
                />
            </View>
            {showCalendar && (
                <DateTimePicker
                    style={styles.formItem}
                    value={date}
                    mode='date'
                    display='default'
                    onChange={onDateChange} // Handle date change
                />
            )}
            <View style={styles.formRow}>
                <Button
                    onPress={() => handleReservation()} // Handle reservation submission
                    title='Search Availability'
                    color='#5637DD'
                    accessibilityLabel='Tap me to search for available campsites to reserve'
                />
            </View>
            
            {/* Modal to display reservation summary */}
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)} // Close the modal on request
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>
                        Search Campsite Reservations
                    </Text>
                    <Text style={styles.modalText}>
                        Number of Campers: {campers}
                    </Text>
                    <Text style={styles.modalText}>
                        Hike-In?: {hikeIn ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.modalText}>
                        Date: {date.toLocaleDateString('en-US')}
                    </Text>
                    <Button
                        onPress={() => {
                            setShowModal(!showModal); // Close the modal
                            resetForm(); // Reset the form
                        }}
                        color='#5637DD'
                        title='Close'
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default ReservationScreen;
