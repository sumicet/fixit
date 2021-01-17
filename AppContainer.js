import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';

import AppNavigator from './navigation/AppNavigator';
import Loading from './components/loading/Loading';
import InAppNotification from './components/alert/InAppNotification';
import { fetchTradespersonInfo } from './store/actions/tradesperson';
import { fetchMyJobs } from './store/actions/job';
import { fetchAll, setDistances } from './store/actions/tradespeople';
import * as Firebase from './config/Firebase';
import {
    autoLogIn,
    setIsLoggedIn,
    setStreetAddress,
    signOut,
    updateToken,
} from './store/actions/auth';
import { fetchReviews } from './store/actions/reviews';

const AppContainer = () => {
    const inAppNotification = {
        title: useSelector(state => state.ui.title),
        message: useSelector(state => state.ui.message),
        inAppNotificationVisible: useSelector(
            state => state.ui.inAppNotificationVisible
        ),
    };

    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector(state => state.auth.userId);

    const fetchFonts = () => {
        return Font.loadAsync({
            'Asap-Bold': require('./assets/fonts/whitneybold.ttf'),
            'Asap-SemiBold': require('./assets/fonts/whitneysemibold.ttf'),
            'Asap-Regular': require('./assets/fonts/whitneymedium.ttf'),
        });
    };

    const dispatch = useDispatch();

    const initialFetches = async () => {
        fetchFonts();
        dispatch(fetchTradespersonInfo(userId));
        dispatch(fetchMyJobs());
        dispatch(fetchAll());
        dispatch(fetchReviews());
        
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const result = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBM6YK35TEtbw_k76cKUnwOMsEjiFmBRm0`
            );
            const resultData = await result.json();

            dispatch(
                setStreetAddress({
                    line1: resultData.results[0].formatted_address,
                    place_id: resultData.results[0].place_id,
                })
            ).then(() => {
                dispatch(setDistances(resultData.results[0].place_id));
            });
        });
    };

    useEffect(() => {
        initialFetches().then(() => {
            setIsLoading(false);
        });
    }, [userId]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <AppNavigator />
            <InAppNotification
                title={inAppNotification.title}
                message={inAppNotification.message}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppContainer;
