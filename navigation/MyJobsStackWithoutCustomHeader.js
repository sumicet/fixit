import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import JobDetailsScreen from '../screens/MyJobs/JobDetailsScreen';
import { headerOptions } from './options/HeaderOptions';

const Stack = createStackNavigator();

const MyJobsStackWithoutCustomHeader = () => {
    return (
        <Stack.Navigator
            headerMode="screen"
            animation
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
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

export default MyJobsStackWithoutCustomHeader;
