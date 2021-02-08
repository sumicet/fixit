import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Layout from '../../constants/Layout';
import GoogleMaps from '../../components/APIs/GoogleMaps';
import TextField from '../../components/text/TextField';
import Line from '../common/Line';
import SmallContent from '../text/SmallContent';
import Touchable from '../common/Touchable';
import Color from '../../constants/Color';

const latitudeDelta = 0.005;
const longitudeDelta = 0.005;
//
const JobAddress = props => {
    const [region, setRegion] = useState({
        latitudeDelta,
        longitudeDelta,
        latitude: 12.840575,
        longitude: 77.651787,
    });

    const [predictions, setPredictions] = useState([]);
    const [showPredictions, setShowPredictions] = useState(false);

    useEffect(() => {
        if (props.initial_place_id)
            initialRegionSettings(props.initial_place_id);
    }, []);

    const onChangeDestination = async destination => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBeeX2gm6j5BatZmCTnb1gKHqMWzavhCTI
          &input=${destination}&location=${0.05}, 
          ${0.05}&radius=2000`;
        const result = await fetch(apiUrl);
        const json = await result.json();
        setPredictions(json.predictions);
        if (predictions && predictions.length) {
            setShowPredictions(true);
        }
    };
    const handlePredictionPress = async id => {
        const apiUrlSelected = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBeeX2gm6j5BatZmCTnb1gKHqMWzavhCTI&place_id=${id}`;
        const selectedResult = await fetch(apiUrlSelected);
        const jsonSelected = await selectedResult.json();
        props.onStreetAddressChange(jsonSelected.result.formatted_address, id);
        setRegion({
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
            latitude: jsonSelected.result.geometry.location.lat,
            longitude: jsonSelected.result.geometry.location.lng,
        });
    };

    const initialRegionSettings = async id => {
        const apiUrlSelected = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBeeX2gm6j5BatZmCTnb1gKHqMWzavhCTI&place_id=${id}`;
        const selectedResult = await fetch(apiUrlSelected);
        const jsonSelected = await selectedResult.json();
        props.onStreetAddressChange(jsonSelected.result.formatted_address, id);
        setRegion({
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
            latitude: jsonSelected.result.geometry.location.lat,
            longitude: jsonSelected.result.geometry.location.lng,
        });
    };

    return (
        <View style={{ width: '100%' }}>
            <Line style={{ flex: 0 }}>
                <TextField
                    value={props.streetAddress}
                    onChangeText={input => {
                        if (input) {
                            onChangeDestination(input);
                        }
                        props.onStreetAddressChange(input, null);
                    }}
                    placeholder="Street Address"
                    multiline={false}
                    textAlignVertical="center"
                />
            </Line>
            {showPredictions && predictions && predictions.length && (
                <Line
                    style={{
                        flex: 0,
                    }}
                >
                    <View style={styles.locationSearchFieldContainer}>
                        {predictions.map((item, index) => (
                            <Touchable
                                isCard={true}
                                style={{
                                    padding: Layout.generalPadding,
                                }}
                                onPress={() => {
                                    setShowPredictions(false);
                                    handlePredictionPress(item.place_id);
                                }}
                            >
                                <SmallContent>{item.description}</SmallContent>
                            </Touchable>
                        ))}
                    </View>
                </Line>
            )}
            {props.hideLine2 ? null : (
                <Line style={{ flex: 0 }}>
                    <TextField
                        value={props.input.line2}
                        onChangeText={input => {
                            props.onChangeText(input);
                        }}
                        placeholder="Apartment, building, floor"
                        multiline={false}
                        textAlignVertical="center"
                    />
                </Line>
            )}
            <Line style={{ flex: 0 }}>
                <View style={styles.googleMapsContainer}>
                    <GoogleMaps
                        region={region}
                        onRegionChange={region => setRegion(region)}
                    />
                </View>
            </Line>
        </View>
    );
};

const styles = StyleSheet.create({
    locationSearchFieldContainer: {
        borderRadius: Layout.borderRadius,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: Color.textField,
    },
    googleMapsContainer: {
        borderRadius: Layout.borderRadius,
        overflow: 'hidden',
        width: '100%',
    },
});

export default JobAddress;
