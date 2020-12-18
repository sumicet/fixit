import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import { coloredHeaderOptions } from './options/HeaderOptions';
import TradespersonProfileScreen from '../screens/Profile/TradespersonProfileScreen';

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
        </Stack.Navigator>
    );
};

export default TradespersonProfileStack;