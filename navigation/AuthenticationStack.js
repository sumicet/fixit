import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import SignUpScreen from '../screens/Authentication/SignUpScreen';
import LogInScreen from '../screens/Authentication/LogInScreen';
import { headerOptions, coloredHeaderOptions } from './options/HeaderOptions';
import VerifyEmailScreen from '../screens/AccountDetails/VerifyEmailScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const AuthenticationStack = (props) => {

    return (
        <Stack.Navigator
            headerMode="screen"
            animation
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="LogIn"
                component={LogInScreen}
                options={{
                    ...coloredHeaderOptions,
                    headerTitle: 'Log In',
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    ...coloredHeaderOptions,
                    headerTitle: 'Sign Up',
                }}
            />
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

export default AuthenticationStack;
