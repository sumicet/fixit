import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import JobDetailsScreen from '../screens/MyJobs/JobDetailsScreen';
import MyJobsScreen from '../screens/MyJobs/MyJobsScreen';
import { headerOptions, coloredHeaderOptions } from './options/HeaderOptions';
import CurrentLocationScreen from '../screens/Home/CurrentLocationScreen';

const Stack = createStackNavigator();

const HomeStackWithoutSearchBar = () => {
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
                name="CurrentLocation"
                component={CurrentLocationScreen}
                options={{
                    headerTitle: 'Change location',
                    ...headerOptions,
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStackWithoutSearchBar;