import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import OccupationsScreen from '../screens/Quiz/OccupationsScreen';
import WorkTypesScreen from '../screens/Quiz/WorkTypesScreen';
import JobDescriptionScreen from '../screens/Quiz/JobDescriptionScreen';
import CustomerTypesScreen from '../screens/Quiz/CustomerTypesScreen';
import PropertyTypesScreen from '../screens/Quiz/PropertyTypesScreen';
import Color from '../constants/Color';
import Layout from '../constants/Layout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const QuizStack = () => {
        return (
            <Stack.Navigator
                headerMode={false}
                screenOptions={{ animationEnabled: false }}
            >
                <Stack.Screen
                    name="Occupations"
                    component={OccupationsScreen}
                />
                <Stack.Screen
                    name="WorkTypes"
                    component={WorkTypesScreen}
                />
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
            </Stack.Navigator>
        );
    };

    const BottomMenu = () => {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        elevation: 0,
                        borderTopWidth: 0.7,
                        borderTopColor: Color.secondaryColor,
                    },
                }}
            >
                <Tab.Screen
                    name="Quiz"
                    component={QuizStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Icon
                                name="home"
                                color={focused ? Color.primaryBrandColor : Color.textColor}
                                size={Layout.menuIconSize}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="MyJobs"
                    component={QuizStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Icon
                                name="solution1"
                                color={focused ? Color.primaryBrandColor : Color.textColor}
                                size={Layout.menuIconSize}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Messages"
                    component={QuizStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Icon
                                name="message1"
                                color={focused ? Color.primaryBrandColor : Color.textColor}
                                size={Layout.menuIconSize}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={QuizStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Icon
                                name="user"
                                color={focused ? Color.primaryBrandColor : Color.textColor}
                                size={Layout.menuIconSize}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <BottomMenu />
        </NavigationContainer>
    );
};

export default AppNavigator;
