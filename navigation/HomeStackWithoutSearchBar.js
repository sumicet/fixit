import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import { headerOptions } from './options/HeaderOptions';
import CurrentLocationScreen from '../screens/Home/CurrentLocationScreen';
import JobDetailsScreen from '../screens/MyJobs/JobDetailsScreen';

const Stack = createStackNavigator();

const HomeStackWithoutSearchBar = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
            animation
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="CurrentLocation"
                component={CurrentLocationScreen}
                options={{
                    headerTitle: 'Change location',
                    ...headerOptions,
                }}
            />
            <Stack.Screen
                name="JobDetails"
                component={JobDetailsScreen}
                options={() => ({
                    ...headerOptions,
                    headerTitle: 'Details',
                })}
            />
        </Stack.Navigator>
    );
};

export default HomeStackWithoutSearchBar;
