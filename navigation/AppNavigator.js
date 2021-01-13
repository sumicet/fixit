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
import {
    autoLogIn,
    setIsLoggedIn,
    signOut,
    updateToken,
} from '../store/actions/auth';
import { fetchTradespersonInfo } from '../store/actions/tradesperson';
import VerificationStack from './VerificationStack';

const AppNavigator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const hasVerifiedEmail = useSelector(state => state.auth.hasVerifiedEmail);

    useEffect(() => {
        
    }, []);

    // useEffect(() => {
    //     dispatch(fetchMyJobs());
    //     //dispatch(fetchTradespersonInfo(userId));
    //     dispatch(fetchAll());
    // }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {isLoggedIn && hasVerifiedEmail && <AppStack />}
            {isLoggedIn && !hasVerifiedEmail && <AuthenticationStack />}
            {!isLoggedIn && <AuthenticationStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
