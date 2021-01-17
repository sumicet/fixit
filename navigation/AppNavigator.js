import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AppStack from './AppStack';
import LoadingStack from './LoadingStack';

const AppNavigator = () => {

    const isLoading = useSelector(state => state.ui.isLoading);

    return (
        <NavigationContainer>
            {isLoading ? <LoadingStack /> : <AppStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
