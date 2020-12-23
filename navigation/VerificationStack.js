import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import { headerOptions } from './options/HeaderOptions';
import VerifyEmailScreen from '../screens/AccountDetails/VerifyEmailScreen';

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
                name="VerifyEmail"
                component={VerifyEmailScreen}
                options={{
                    headerTitle: 'Verify email',
                    ...headerOptions,
                }}
            />
        </Stack.Navigator>
    );
};

export default VerificationStack;