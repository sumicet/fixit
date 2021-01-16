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
import LoadingStack from './LoadingStack';

const AppNavigator = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const hasVerifiedEmail = useSelector(state => state.auth.hasVerifiedEmail);
    const isLoading = useSelector(state => state.ui.isLoading);

    return (
        <NavigationContainer>
            {/* {isLoading && <LoadingStack />}
            {!isLoading && isLoggedIn && hasVerifiedEmail && <AppStack />}
            {!isLoading && isLoggedIn && !hasVerifiedEmail && <AuthenticationStack />}
            {!isLoading && !isLoggedIn && <AuthenticationStack />} */}
            {isLoading && <LoadingStack />}
            {!isLoading && isLoggedIn && <AppStack />}
            {!isLoading && !isLoggedIn && <AuthenticationStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
