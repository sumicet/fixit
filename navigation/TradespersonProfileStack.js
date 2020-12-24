import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import { headerOptions, coloredHeaderOptions } from './options/HeaderOptions';
import TradespersonProfileScreen from '../screens/Profile/TradespersonProfileScreen';
import ReviewScreen from '../screens/Profile/ReviewScreen';

const Stack = createStackNavigator();

const TradespersonProfileStack = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
            animation
            screenOptions={{
                cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                options={{ ...coloredHeaderOptions }}
                name="TradespersonProfile"
                component={TradespersonProfileScreen}
            />
            <Stack.Screen
                name="Review"
                component={ReviewScreen}
                options={{
                    headerShown: true,
                    ...headerOptions,
                    headerTitle: 'Leave a review',
                }}
            />
        </Stack.Navigator>
    );
};

export default TradespersonProfileStack;