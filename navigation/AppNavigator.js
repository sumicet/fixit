import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OccupationsScreen from '../screens/Quiz/OccupationsScreen';
import WorkTypesScreen from '../screens/Quiz/WorkTypesScreen';
import JobDescriptionScreen from '../screens/Quiz/JobDescriptionScreen';
import CustomerTypesScreen from '../screens/Quiz/CustomerTypesScreen';
import PropertyTypesScreen from '../screens/Quiz/PropertyTypesScreen';
import JobAddressScreen from '../screens/Quiz/JobAddressScreen';
import StartTimesScreen from '../screens/Quiz/StartTimesScreen';

import HomeScreen from '../screens/Home/HomeScreen';
import MessagesScreen from '../screens/Messages/MessagesScreen';
import MyJobsScreen from '../screens/MyJobs/MyJobsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();
const BottomStack = createStackNavigator();

const AppNavigator = () => {
    const QuizStack = () => {
        return (
            <Stack.Navigator headerMode={false}>
                <Stack.Screen
                    name="Occupations"
                    component={OccupationsScreen}
                />
                <Stack.Screen name="WorkTypes" component={WorkTypesScreen} />
                <Stack.Screen
                    name="JobDescription"
                    component={JobDescriptionScreen}
                />
                <Stack.Screen
                    name="CustomerTypes"
                    component={CustomerTypesScreen}
                />
                <Stack.Screen
                    name="PropertyTypes"
                    component={PropertyTypesScreen}
                />
                <Stack.Screen name="JobAddress" component={JobAddressScreen} />
                <Stack.Screen name="StartTimes" component={StartTimesScreen} />
            </Stack.Navigator>
        );
    };

    const BottomMenu = () => {
        return (
            <BottomStack.Navigator headerMode={false}>
                <Stack.Screen name="Quiz" component={QuizStack} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MyJobs" component={MyJobsScreen} />
                <Stack.Screen name="Messages" component={MessagesScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </BottomStack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <BottomMenu />
        </NavigationContainer>
    );
};

export default AppNavigator;
