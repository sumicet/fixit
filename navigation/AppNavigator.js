import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
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
import UserProfileScreen from '../screens/Profile/UserProfileScreen';
import TradespersonProfileScreen from '../screens/Profile/TradespersonProfileScreen';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import Touchable from '../components/common/Touchable';
import { fetchMyJobs } from '../store/actions/job';
import Loading from '../components/loading/Loading';
import VerifyEmailScreen from '../screens/ResetEmailOrPassword/VerifyEmailScreen';
import VerifyCodeScreen from '../screens/ResetEmailOrPassword/VerifyCodeScreen';
import ResetPasswordScreen from '../screens/ResetEmailOrPassword/ResetPasswordScreen';
import SelectOptionScreen from '../screens/ResetEmailOrPassword/SelectOptionScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        dispatch(fetchMyJobs()).then(() => {
            if (mounted) {
                setIsLoading(false);
            }
        });
        return () => (mounted = false);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const QuizStack = () => {
        return (
            <Stack.Navigator
                headerMode={false}
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
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

    const MyJobsStack = () => {
        return (
            <Stack.Navigator
                headerMode={false}
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen name="MyJobs" component={MyJobsScreen} />
                <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
            </Stack.Navigator>
        );
    };

    const ProfileStack = () => {
        return (
            <Stack.Navigator
                headerMode={false}
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen
                    name="UserProfile"
                    component={UserProfileScreen}
                />
                <Stack.Screen
                    name="TradespersonProfile"
                    component={TradespersonProfileScreen}
                />
                <Stack.Screen
                    name="ResetEmailOrPassword"
                    component={ResetEmailOrPasswordStack}
                />
            </Stack.Navigator>
        );
    };

    const HomeStack = () => {
        return (
            <Stack.Navigator
                headerMode={false}
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="TradespersonProfile"
                    component={TradespersonProfileScreen}
                />
            </Stack.Navigator>
        );
    };

    const ResetEmailOrPasswordStack = () => {
        return (
            <Stack.Navigator
                headerMode={false}
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen
                    name="SelectOption"
                    component={SelectOptionScreen}
                />
                <Stack.Screen
                    name="VerifyEmail"
                    component={VerifyEmailScreen}
                />
                <Stack.Screen
                    name="VerifyCode"
                    component={VerifyCodeScreen}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                />
            </Stack.Navigator>
        );
    };

    const BottomTab = () => {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    keyboardHidesTabBar: true,
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
                                    if (route.name === 'Profile') {
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
                                    if (route.name === 'Quiz') {
                                        navigation.navigate(route.name, {
                                            screen: 'Occupations',
                                        });
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
                    component={HomeStack}
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
                    name="Profile"
                    component={ProfileStack}
                    listeners={() => ({
                        tabPress: () => {},
                    })}
                />
            </Tab.Navigator>
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
