import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { navigationRef } from './AppNavigator';
import InitialLoadingScreen from '../screens/Loading/InitialLoadingScreen';

const Stack = createStackNavigator();

const LoadingStack = () => {

    return (
        <Stack.Navigator
            //animation
            headerMode="none"
        >
            <Stack.Screen
                name="InitialLoadingScreen"
                component={InitialLoadingScreen}
            />
        </Stack.Navigator>
    );
};

export default LoadingStack;