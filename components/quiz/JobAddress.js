import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Layout from '../../constants/Layout';
import LocationSearchField from '../../components/APIs/LocationSearchField';
import GoogleMaps from '../../components/APIs/GoogleMaps';
import TextField from '../../components/text/TextField';
import Line from '../common/Line';

const latitudeDelta = 0.00522;
const longitudeDelta = 0.00221;
//
const JobAddress = props => {
    const [input, setInput] = useState();
    const [streetAddress, setStreetAddress] = useState();

    const jobAddress = useSelector(state => state.quiz.jobAddress);

    useEffect(() => {
        if (jobAddress) {
            setStreetAddress(jobAddress.line1);
            setInput(jobAddress.line2);
        }
    }, []);

    const [region, setRegion] = useState({
        latitudeDelta,
        longitudeDelta,
        latitude: 12.840575,
        longitude: 77.651787,
    });

    const onChangeText = updatedInput => {
        setInput(updatedInput);
    };

    return (
        <View style={{ width: '100%' }}>
            <Line style={{ flex: 0 }}>
                <View style={styles.locationSearchFieldContainer}>
                    <LocationSearchField
                        oldStreetAddress={jobAddress ? jobAddress.line1 : null}
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
            </Line>
            <Line style={{ flex: 0 }}>
                <TextField
                    value={input}
                    onChangeText={input => {
                        onChangeText(input);
                    }}
                    placeholder="Apartment, building, floor"
                    multiline={false}
                    textAlignVertical="center"
                />
            </Line>
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
        backgroundColor: 'red',
        width: '100%',
    },
    googleMapsContainer: {
        borderRadius: Layout.borderRadius,
        overflow: 'hidden',
        width: '100%',
    },
});

export default JobAddress;
