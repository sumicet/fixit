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
        </Stack.Navigator>
    );
};

export default AppStack;
