import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import JobDetailsScreen from '../screens/MyJobs/JobDetailsScreen';
import MyJobsScreen from '../screens/MyJobs/MyJobsScreen';
import { headerOptions, coloredHeaderOptions } from './options/HeaderOptions';

const Stack = createStackNavigator();

const MyJobsStack = () => {
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
                name="MyJobs"
                component={MyJobsScreen}
                options={{
                    headerTitle: 'My Jobs',
                    ...headerOptions,
                }}
            />
            <Stack.Screen
                name="JobDetails"
                component={JobDetailsScreen}
                options={() => ({
                    ...coloredHeaderOptions,
                    headerTitle: 'Details',
                })}
            />
        </Stack.Navigator>
    );
};

export default MyJobsStack;