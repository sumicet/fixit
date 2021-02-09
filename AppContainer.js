import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';

import AppNavigator from './navigation/AppNavigator';
import Loading from './components/loading/Loading';
import InAppNotification from './components/alert/InAppNotification';
import { fetchTradespersonInfo } from './store/actions/tradesperson';
import { fetchAllJobs, fetchMyJobs } from './store/actions/job';
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
import * as ui from './store/actions/ui';
import { Alert } from 'react-native';
import { fetchCustomers } from './store/actions/customers';
import { useFonts } from 'expo-font';

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
    const userType = useSelector(state => state.auth.userType);
    const place_id = useSelector(state => state.auth.streetAddress.place_id);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const uiIsLoading = useSelector(state => state.ui.isLoading);
    const hasVerifiedEmail = useSelector(state => state.auth.hasVerifiedEmail);

    const dispatch = useDispatch();

    const detectUserChanges = async () => {
        const unsub = await Firebase.auth.onAuthStateChanged(user => {
            if (user) {
                Firebase.auth.currentUser.getIdToken().then(token => {
                    dispatch(
                        updateToken(Firebase.auth.currentUser.uid, token)
                    ).then(() => {
                        hasVerifiedEmail &&
                            dispatch(autoLogIn()).then(() => {
                                console.log(
                                    'token expired / logged in',
                                    Firebase.auth.currentUser.uid
                                );
                                fetchFonts().then(() => {
                                    setIsLoading(false);
                                });
                            });
                    });
                });
            } else {
                dispatch(setIsLoggedIn(false)).then(() => {
                    dispatch(signOut()).then(() => {
                        console.log('logged out');
                        dispatch(ui.setIsLoading(false));
                        !isLoggedIn &&
                            fetchFonts().then(() => {
                                setIsLoading(false);
                            });
                    });
                });
            }
        });
        return () => {
            unsub();
        };
    };

    useEffect(() => {
        detectUserChanges();
    }, [userId]);

    useEffect(() => {
        dispatch(ui.setIsLoading(true));
        if (isLoggedIn) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(async position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const result = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBeeX2gm6j5BatZmCTnb1gKHqMWzavhCTI`
                );
                const resultData = await result.json();

                dispatch(
                    setStreetAddress({
                        line1: resultData.results[0].formatted_address,
                        place_id: resultData.results[0].place_id,
                    })
                ).then(() => {
                    initialFetches(resultData.results[0].place_id).then(() => {
                        setIsLoading(false);
                    });
                });
            });
        }
    }, [isLoggedIn, place_id]);

    const fetchFonts = async () => {
        await Font.loadAsync({
            Bold: require('./assets/fonts/whitneybold.ttf'),
            SemiBold: require('./assets/fonts/whitneysemibold.ttf'),
            Regular: require('./assets/fonts/whitneymedium.ttf'),
        });
    };

    const initialFetches = async (place_id) => {
        Promise.all([
            fetchFonts(),
            userType === 'tradesperson' &&
                dispatch(fetchTradespersonInfo(userId)),
            dispatch(fetchMyJobs(userId, userType)),
            dispatch(fetchCustomers()),
            dispatch(fetchReviews()),
        ]).then(() => {
            Promise.all([
                userType === 'customer' && dispatch(fetchAll(userId, place_id)),
                userType === 'tradesperson' &&
                    dispatch(fetchAllJobs(userId, userType, place_id)),
            ]).then(() => {
                dispatch(ui.setIsLoading(false));
            });
        });
    };

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
