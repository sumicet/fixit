import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import UserProfileScreen from '../screens/Profile/UserProfileScreen';
import TradespersonProfileScreen from '../screens/Profile/TradespersonProfileScreen';
import { headerOptions, coloredHeaderOptions } from './options/HeaderOptions';
import ReviewScreen from '../screens/Profile/ReviewScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
            animation
            screenOptions={{
                cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{
                    headerShown: true,
                    ...coloredHeaderOptions,
                }}
            />
            <Stack.Screen
                name="TradespersonProfile"
                component={TradespersonProfileScreen}
                options={{
                    headerShown: true,
                    ...coloredHeaderOptions,
                }}
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
            {/* <Stack.Screen name="Service" component={ServiceStack} /> */}
        </Stack.Navigator>
    );
};

export default ProfileStack;