import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import QuizScreen from '../../components/containers/QuizScreen';
import Layout from '../../constants/Layout';
import LocationSearchField from '../../components/APIs/LocationSearchField';
import GoogleMaps from '../../components/APIs/GoogleMaps';
import TextField from '../../components/text/TextField';
import { setJobAddress } from '../../store/actions/quiz';

const latitudeDelta = 0.00522;
const longitudeDelta = 0.00221;
//
const JobAddressScreen = props => {
    const [input, setInput] = useState();
    const [streetAddress, setStreetAddress] = useState();

    const [region, setRegion] = useState({
        latitudeDelta,
        longitudeDelta,
        latitude: 12.840575,
        longitude: 77.651787,
    });

    const dispatch = useDispatch();

    const onChangeText = updatedInput => {
        setInput(updatedInput);
    };

    const handleNextPress = () => {
        dispatch(setJobAddress({ line1: streetAddress, line2: input })); //TODO reset input at the end of the quiz
        props.navigation.navigate('StartTimes');
    };

    return (
        <QuizScreen
            title="Where are you?"
            showNextButton={true}
            onPress={handleNextPress}
            showNextButton={
                props.route.params && props.route.params.action === 'edit' ? true : false
            }
            onPress={handleNextPress}
        >
            <View style={styles.container}>
                <View style={styles.locationSearchFieldContainer}>
                    <LocationSearchField
                        placeholder="Street address"
                        onPress={(data, details = null) => {
                            setRegion({
                                latitudeDelta,
                                longitudeDelta,
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            });
                            setStreetAddress(data.description);
                        }}
                    />
                </View>
                <TextField
                    value={props.input}
                    onChangeText={input => {
                        onChangeText(input);
                    }}
                    placeholder="Apartment, building, floor"
                    multiline={false}
                    containerStyle={{ marginVertical: Layout.generalMargin }}
                    textAlignVertical="center"
                />
                <View style={styles.googleMapsContainer}>
                    <GoogleMaps
                        region={region}
                        onRegionChange={region => setRegion(region)}
                    />
                </View>
            </View>
        </QuizScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:
            Layout.screenHorizontalPadding - Layout.generalPadding,
    },
    locationSearchFieldContainer: {
        borderRadius: Layout.borderRadius,
        overflow: 'hidden',
    },
    googleMapsContainer: {
        borderRadius: Layout.borderRadius,
        overflow: 'hidden',
    },
});

export default JobAddressScreen;
