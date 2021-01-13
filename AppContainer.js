import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Font from 'expo-font';

import AppNavigator from './navigation/AppNavigator';
import Loading from './components/loading/Loading';
import InAppNotification from './components/alert/InAppNotification';
import { fetchTradespersonInfo } from './store/actions/tradesperson';
import { fetchMyJobs } from './store/actions/job';
import { fetchAll } from './store/actions/tradespeople';
import * as Firebase from './config/Firebase';
import {
    autoLogIn,
    setIsLoggedIn,
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

    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.auth.userId);

    const fetchFonts = () => {
        return Font.loadAsync({
            'Asap-Bold': require('./assets/fonts/whitneybold.ttf'),
            'Asap-SemiBold': require('./assets/fonts/whitneysemibold.ttf'),
            'Asap-Regular': require('./assets/fonts/whitneymedium.ttf'),
        });
    };

    const dispatch = useDispatch();

    const initialization = async () => {
        setIsLoading(true);
        const unsub = await Firebase.auth.onAuthStateChanged(user => {
            if (user) {
                Firebase.auth.currentUser.getIdToken().then(token => {
                    dispatch(
                        updateToken(Firebase.auth.currentUser.uid, token)
                    ).then(() => {
                        dispatch(autoLogIn()).then(() => {
                            console.log(
                                'token expired / logged in',
                                Firebase.auth.currentUser.uid
                            );
                        });
                    });
                });
            } else {
                dispatch(setIsLoggedIn(false)).then(() => {
                    dispatch(signOut()).then(() => {
                        console.log('logged out');
                    });
                });
            }
        });
        setIsLoading(false);
        return () => {
            unsub();
        };
    };

    useEffect(() => {
        initialization();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchFonts();
        dispatch(fetchTradespersonInfo(userId));
        dispatch(fetchMyJobs());
        dispatch(fetchAll());
        dispatch(fetchReviews());

        setIsLoading(false);
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
