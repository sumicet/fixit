import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators,
} from '@react-navigation/stack';
import HomeStackWithSearchBar from './HomeStackWithSearchBar';
import TradespersonProfileStack from './TradespersonProfileStack';
import HomeStackWithoutSearchBar from './HomeStackWithoutSearchBar';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            //animation
            headerMode="none"
            screenOptions={() => ({
                headerStyleInterpolator:
                    HeaderStyleInterpolators.forNoAnimation,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            })}
        >
            <Stack.Screen
                name="HomeStackWithSearchBar"
                component={HomeStackWithSearchBar}
            />
            <Stack.Screen
                name="TradespersonProfile"
                component={TradespersonProfileStack}
            />
            <Stack.Screen
                name="HomeStackWithoutSearchBar"
                component={HomeStackWithoutSearchBar}
            />
            
        </Stack.Navigator>
    );
};

export default HomeStack;
