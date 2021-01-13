import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';

import MessagesScreen from '../screens/Messages/MessagesScreen';
import MessagesScreenCopy from '../screens/Messages/MessagesScreenCopy';
import { headerOptions } from './options/HeaderOptions';

const Stack = createStackNavigator();

const MessagesStack = () => {

    return (
        <Stack.Navigator
            animation
            headerMode="screen"
            screenOptions={{
                cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    headerTitle: 'Messages',
                    ...headerOptions,
                }}
            />
            <Stack.Screen
                name="MessagesCopy"
                component={MessagesScreenCopy}
                options={{
                    headerTitle: 'Messages Copy',
                    ...headerOptions,
                }}
            />
        </Stack.Navigator>
    );
};

export default MessagesStack;