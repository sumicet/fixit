import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import EditJobScreen from '../screens/Quiz/EditJobScreen';
import NewJobScreen from '../screens/Quiz/NewJobScreen';
import { headerOptions } from './options/HeaderOptions';
import BottomTab from './BottomTab';
import InputNewEmailScreen from '../screens/AccountDetails/InputNewEmailScreen';
import RelogUserScreen from '../screens/AccountDetails/RelogUserScreen';
import VerifyEmailScreen from '../screens/AccountDetails/VerifyEmailScreen';
import EditTradespersonProfileScreen from '../screens/Profile/EditTradespersonProfileScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
            animation
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="BottomTab"
                component={BottomTab}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewJob"
                component={NewJobScreen}
                options={{
                    headerTitle: 'New',
                    ...headerOptions,
                }}
            />
            <Stack.Screen
                name="EditJob"
                component={EditJobScreen}
                options={{
                    headerTitle: 'Edit',
                    ...headerOptions,
                }}
            />
            <Stack.Screen
                name="RelogUser"
                component={RelogUserScreen}
                options={{
                    headerTitle: 'Confirm password',
                    ...headerOptions,
                }}
            />
            <Stack.Screen
                name="InputNewEmail"
                component={InputNewEmailScreen}
                options={{
                    headerTitle: 'New email',
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
                name="EditTradespersonProfile"
                component={EditTradespersonProfileScreen}
                options={{
                    headerShown: true,
                    ...headerOptions,
                    headerTitle: 'Customize your profile',
                }}
            />
        </Stack.Navigator>
    );
};

export default AppStack;
