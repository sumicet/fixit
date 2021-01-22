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
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const uiIsLoading = useSelector(state => state.ui.isLoading);

    const dispatch = useDispatch();

    const detectUserChanges = async () => {
        const unsub = await Firebase.auth.onAuthStateChanged(user => {
            if (user) {
                Firebase.auth.currentUser.getIdToken().then(token => {
                    dispatch(
                        updateToken(Firebase.auth.currentUser.uid, token)
                    ).then(() => {
                        dispatch(autoLogIn()).then(async () => {
                            console.log(
                                'token expired / logged in',
                                Firebase.auth.currentUser.uid
                            );
                            setIsLoading(false);
                        });
                    });
                });
            } else {
                dispatch(setIsLoggedIn(false)).then(() => {
                    dispatch(signOut()).then(() => {
                        console.log('logged out');
                        dispatch(ui.setIsLoading(false));
                        !isLoggedIn && setIsLoading(false);
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
        if (isLoggedIn) {
            setIsLoading(true);
            initialFetches().then(() => {
                setIsLoading(false);
            })
        }
    }, [isLoggedIn]);

    const fetchFonts = () => {
        return Font.loadAsync({
            'Bold': require('./assets/fonts/whitneybold.ttf'),
            'SemiBold': require('./assets/fonts/whitneysemibold.ttf'),
            'Regular': require('./assets/fonts/whitneymedium.ttf'),
        });
    };

    const initialFetches = async () => {
        console.log('done initial shit');
        Promise.all([
            fetchFonts(),
            userType === 'tradesperson' && dispatch(fetchTradespersonInfo(userId)),
            dispatch(fetchMyJobs(userId, userType)),
            userType === 'customer' && dispatch(fetchAll()),
            userType === 'tradesperson' && dispatch(fetchCustomers()),
            dispatch(fetchAllJobs(userId, userType)),
            dispatch(fetchReviews()),
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
                )
                // .then(() => {
                //     dispatch(setDistances(resultData.results[0].place_id));
                // });
            }),
        ]).then(() => {
            dispatch(ui.setIsLoading(false)).then(() => {
                console.log(
                    'LOADEDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                );
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
