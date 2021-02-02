import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View } from 'react-native';
import Header from '../components/text/Header';
import Color from '../constants/Color';
import Touchable from '../components/common/Touchable';
import Layout from '../constants/Layout';
import MyJobsStackWithoutCustomHeader from './MyJobsStackWithoutCustomHeader';
import MyJobsStackWithCustomHeader from './MyJobsStackWithCustomHeader';
import TradespersonProfileStack from './TradespersonProfileStack';

const Stack = createStackNavigator();

const MyJobsStack = () => {

    return (
        <Stack.Navigator
            headerMode="none"
            animation
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="MyJobsStackWithCustomHeader"
                component={MyJobsStackWithCustomHeader}
            />
            <Stack.Screen
                name="MyJobsStackWithoutCustomHeader"
                component={MyJobsStackWithoutCustomHeader}
            />
            <Stack.Screen
                name="TradespersonProfile"
                component={TradespersonProfileStack}
            />
        </Stack.Navigator>
    );
};

export default MyJobsStack;
