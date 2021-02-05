import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import { coloredHeaderOptions, headerOptions } from './options/HeaderOptions';
import CurrentLocationScreen from '../screens/Home/CurrentLocationScreen';
import JobDetailsScreen from '../screens/MyJobs/JobDetailsScreen';
import SelectJobScreen from '../screens/Home/SelectJobScreen';
import FiltersScreen from '../screens/Home/FiltersScreen';

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
            <Stack.Screen
                name="SelectJob"
                component={SelectJobScreen}
                options={() => ({
                    ...headerOptions,
                    headerTitle: 'Select job',
                })}
            />
            <Stack.Screen
                name="Filters"
                component={FiltersScreen}
                options={{
                    headerShown: true,
                    ...coloredHeaderOptions,
                    headerTitle: 'Filters'
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStackWithoutSearchBar;
