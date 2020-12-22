import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMyJobs } from '../store/actions/job';
import Loading from '../components/loading/Loading';
import AuthenticationStack from './AuthenticationStack';
import AppStack from './AppStack';
import { fetchAll } from '../store/actions/tradespeople';
import * as Firebase from '../config/Firebase';
import { updateToken } from '../store/actions/auth';
import { fetchTradespersonInfo } from '../store/actions/tradesperson';

const AppNavigator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {
        const unsub = Firebase.auth.onAuthStateChanged(user => {
            if (user) {
                const token = Firebase.auth.currentUser.getIdToken();
                dispatch(updateToken(token));
                console.log('token expired / logged in');
            } else {
                console.log('logged out');
            }
        });

        return () => unsub();
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
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthenticationStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;

// const ServiceStack = () => {
//     return (
//         <Stack.Navigator
//             headerMode={false}
//             animation
//             screenOptions={{
//                 cardStyleInterpolator:
//                     CardStyleInterpolators.forHorizontalIOS,
//             }}
//         >
//             <Stack.Screen name="Services" component={ServicesScreen} />
//         </Stack.Navigator>
//     );
// };
