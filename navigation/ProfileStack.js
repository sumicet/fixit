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
import ChangeNameScreen from '../screens/Profile/ChangeNameScreen';
import { useSelector } from 'react-redux';
import Color from '../constants/Color';

const Stack = createStackNavigator();

const ProfileStack = () => {

    const userType = useSelector(state => state.auth.userType);

    return (
        <Stack.Navigator
            headerMode="screen"
            animation
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
                    headerStyle: {
                        backgroundColor:
                            userType === "tradesperson"
                                ? Color.secondaryBrandColor
                                : Color.primaryColor,
                    },
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
            <Stack.Screen
                name="ChangeName"
                component={ChangeNameScreen}
                options={{
                    headerShown: true,
                    ...headerOptions,
                    headerTitle: 'Change name',
                }}
            />
        </Stack.Navigator>
    );
};

export default ProfileStack;
