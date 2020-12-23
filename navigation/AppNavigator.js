import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMyJobs } from '../store/actions/job';
import Loading from '../components/loading/Loading';
import AuthenticationStack from './AuthenticationStack';
import AppStack from './AppStack';
import { fetchAll } from '../store/actions/tradespeople';
import * as Firebase from '../config/Firebase';
import { autoLogIn, setIsLoggedIn, signOut, updateToken } from '../store/actions/auth';
import { fetchTradespersonInfo } from '../store/actions/tradesperson';
import VerificationStack from './VerificationStack';

export const navigationRef = React.createRef();

const AppNavigator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userId = useSelector(state => state.auth.userId);
    const hasVerifiedEmail = useSelector(state => state.auth.hasVerifiedEmail);

    useEffect(() => {
        const unsub = Firebase.auth.onAuthStateChanged(user => {
            console.log('subbing')
            if (user) {
                Firebase.auth.currentUser.getIdToken().then(token => {
                    dispatch(
                        updateToken(Firebase.auth.currentUser.uid, token)
                    ).then(() => {
                        dispatch(autoLogIn());
                    });
                });

                console.log(
                    'token expired / logged in',
                    Firebase.auth.currentUser.uid
                );
            } else {
                console.log('logged out');
                dispatch(setIsLoggedIn(false));
            }
        });

        return () => {unsub(); console.log('unsubbing')};
    }, []);

    useEffect(() => {
        dispatch(fetchMyJobs());
        dispatch(fetchTradespersonInfo(userId));
        dispatch(fetchAll());
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    

    return (
        <NavigationContainer ref={navigationRef}>
            {isLoggedIn && hasVerifiedEmail && <AppStack />}
            {isLoggedIn && !hasVerifiedEmail && <VerificationStack />}
            {!isLoggedIn && <AuthenticationStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
