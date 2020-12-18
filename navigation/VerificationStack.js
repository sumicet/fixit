import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import VerificationScreen from '../screens/Authentication/VerificationScreen';
import { headerOptions, coloredHeaderOptions } from './options/HeaderOptions';

const Stack = createStackNavigator();

const VerificationStack = () => {
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
                name="Verification"
                component={VerificationScreen}
                options={{
                    ...coloredHeaderOptions,
                    headerTitle: 'Verification',
                    headerLeft: null
                }}
                
            />
        </Stack.Navigator>
    );
};

export default VerificationStack;