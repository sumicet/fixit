import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/containers/Container';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import HeaderRight from '../../components/navigation/HeaderRight';
import JobAddress from '../../components/quiz/JobAddress';
import { ERROR } from '../../constants/Actions';
import { setStreetAddress } from '../../store/actions/auth';
import { setDistances } from '../../store/actions/tradespeople';
import { setInAppNotification } from '../../store/actions/ui';

const CurrentLocationScreen = props => {
    const streetAddress = useSelector(state => state.auth.streetAddress);
    // const [streetAddressInput, setStreetAddressInput] = useState({
    //     line1: streetAddress.line1,
    //     place_id: streetAddress.place_id,
    // });

    const [line1, setLine1] = useState(streetAddress.line1);
    const [place_id, setPlace_id] = useState(streetAddress.place_id);
    const dispatch = useDispatch();

    const handleSubmitPress = () => {
        if(!place_id) {
            dispatch(setInAppNotification('Invalid address', 'Please select an address from the list.', ERROR));
        } else {
            dispatch(setStreetAddress({
                line1,
                place_id
            }))
            props.navigation.goBack();
        }
        dispatch(setDistances(place_id))
    };

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderRight onPress={handleSubmitPress} iconName="check" />
            ),
        });
    }, [line1, place_id]);

    const handleStreetAddressChange = (street, place_id) => {
        setLine1(street);
        setPlace_id(place_id);
    };

    return (
        <ScrollableContainer style={{ paddingTop: 0, marginTop: 0 }}>
            <JobAddress
                onStreetAddressChange={handleStreetAddressChange}
                hideLine2={true}
                streetAddress={line1}
                initial_place_id={streetAddress.place_id}
            />
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default CurrentLocationScreen;
