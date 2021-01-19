import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
} from '@react-navigation/stack';
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