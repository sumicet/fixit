import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import OccupationsScreen from '../screens/Quiz/OccupationsScreen';
import WorkTypesScreen from '../screens/Quiz/WorkTypesScreen';
import JobDescriptionScreen from '../screens/Quiz/JobDescriptionScreen';
import CustomerTypesScreen from '../screens/Quiz/CustomerTypesScreen';
import PropertyTypesScreen from '../screens/Quiz/PropertyTypesScreen';
import JobAddressScreen from '../screens/Quiz/JobAddressScreen';
import StartTimesScreen from '../screens/Quiz/StartTimesScreen';
import JobDetailsScreen from '../screens/MyJobs/JobDetailsScreen';

import HomeScreen from '../screens/Home/HomeScreen';
import MessagesScreen from '../screens/Messages/MessagesScreen';
import MyJobsScreen from '../screens/MyJobs/MyJobsScreen';
import TradespersonProfileScreen from '../screens/Profile/TradespersonProfileScreen';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import Touchable from '../components/common/Touchable';

const Stack = createStackNavigator();
const BottomStack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

    const BottomTab = () => {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        elevation: 0,
                        borderTopWidth: 0.7,
                        borderTopColor: Color.textField,
                    },
                }}
                screenOptions={({ navigation, route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else {
                            if (route.name === 'MyJobs') {
                                iconName = 'solution1';
                            } else {
                                if (route.name === 'Messages') {
                                    iconName = 'message1';
                                } else {
                                    if (route.name === 'TradespersonProfile') {
                                        iconName = 'user';
                                    } else {
                                        if (route.name === 'Quiz') {
                                            iconName = 'plus';
                                        }
                                    }
                                }
                            }
                        }

                        return (
                            <Touchable
                                onPress={() => {
                                    if(route.name === 'Quiz') {
                                        navigation.navigate(route.name, {screen: 'Occupations'});
                                    } else {
                                        navigation.navigate(route.name);
                                    }
                                }}
                                style={styles.touchable}
                            >
                                <Icon
                                    name={iconName}
                                    color={
                                        focused
                                            ? Color.primaryBrandColor
                                            : Color.secondaryColor
                                    }
                                    size={Layout.menuIconSize}
                                />
                            </Touchable>
                        );
                    },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    listeners={() => ({
                        tabPress: () => {},
                    })}
                />
                <Tab.Screen
                    name="MyJobs"
                    component={MyJobsStack}
                    listeners={() => ({
                        tabPress: () => {},
                    })}
                />
                <Tab.Screen
                    name="Quiz"
                    component={QuizStack}
                    listeners={() => ({
                        tabPress: () => {},
                    })}
                />
                <Tab.Screen
                    name="Messages"
                    component={MessagesScreen}
                    listeners={() => ({
                        tabPress: () => {},
                    })}
                />
                <Tab.Screen
                    name="TradespersonProfile"
                    component={TradespersonProfileScreen}
                    listeners={() => ({
                        tabPress: () => {},
                    })}
                />
            </Tab.Navigator>
        );
    };

    const MyJobsStack = () => {
        return (
            <BottomStack.Navigator headerMode={false}>
                <Stack.Screen name="MyJobs" component={MyJobsScreen} />
                <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
            </BottomStack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <BottomTab />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },
});

export default AppNavigator;
