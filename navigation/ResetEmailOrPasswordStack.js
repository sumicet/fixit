import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import VerifyEmailScreen from '../screens/ResetEmailOrPassword/VerifyEmailScreen';
import VerifyCodeScreen from '../screens/ResetEmailOrPassword/VerifyCodeScreen';
import ResetPasswordScreen from '../screens/ResetEmailOrPassword/ResetPasswordScreen';
import { headerOptions } from './options/HeaderOptions';
import SelectOptionScreen from '../screens/ResetEmailOrPassword/SelectOptionScreen';

const Stack = createStackNavigator();

const ResetEmailOrPasswordStack = () => {
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
                name="SelectOption"
                component={SelectOptionScreen}
                options={{
                    headerTitle: 'Change account details',
                    ...headerOptions,
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
            <Stack.Screen
                name="VerifyCode"
                component={VerifyCodeScreen}
                options={{
                    headerTitle: 'Confirm code',
                    ...headerOptions,
                }}
            />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{
                    headerTitle: 'Reset password',
                    ...headerOptions,
                }}
            />
        </Stack.Navigator>
    );
};

export default ResetEmailOrPasswordStack;