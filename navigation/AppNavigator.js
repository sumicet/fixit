import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMyJobs } from '../store/actions/job';
import Loading from '../components/loading/Loading';
import AuthenticationStack from './AuthenticationStack';
import AppStack from './AppStack';
import { fetchAll } from '../store/actions/tradespeople';

const AppNavigator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const hasVerifiedEmail = useSelector(state => state.auth.hasVerifiedEmail);
    const userId = useSelector(state => state.auth.userId);

    // useEffect(() => {
    //     let mounted = true;
    //     setIsLoading(true);
    //     dispatch(fetchMyJobs()).then(() => {
    //         if (mounted) {
    //             setIsLoading(false);
    //         }
    //     });
    //     return () => (mounted = false);
    // }, []);

    useEffect(() => {
        dispatch(fetchMyJobs());
        dispatch(fetchAll());
    }, [])

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
