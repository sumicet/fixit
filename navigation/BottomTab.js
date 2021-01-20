import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Briefcase from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../constants/Color';
import Layout from '../constants/Layout';
import Touchable from '../components/common/Touchable';
import NewJobScreen from '../screens/Quiz/NewJobScreen';
import ProfileStack from './ProfileStack';
import MyJobsStack from './MyJobsStack';
import HomeStack from './HomeStack';
import { useSelector } from 'react-redux';
import { HeaderTitle } from '@react-navigation/stack';
import MyJobsStackWithoutCustomHeader from './MyJobsStackWithoutCustomHeader';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    const userType = useSelector(state => state.auth.userType);

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                keyboardHidesTabBar: true,
                style: {
                    elevation: 0,
                    borderTopWidth: 0.7,
                    borderTopColor: Color.textField,
                    backgroundColor: Color.textField,
                },
            }}
            screenOptions={({ navigation, route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'view-dashboard';
                    } else {
                        if (route.name === 'MyJobs') {
                            iconName = 'view-dashboard';
                        } else {
                            if (route.name === 'Profile') {
                                iconName = 'account';
                            } else {
                                if (route.name === 'FakeNewJob') {
                                    iconName = 'plus';
                                }
                            }
                        }
                    }

                    return (
                        <Touchable
                            onPress={() => {
                                console.log(route.name);
                                if (route.name === 'FakeNewJob') {
                                    navigation.navigate('NewJob');
                                } else {
                                    if (route.name === 'MyJobsStack') {
                                        navigation.navigate('MyJobsStack', {
                                            screen:
                                                'MyJobsStackWithCustomHeader',
                                            params: {
                                                screen: 'MyJobs',
                                            },
                                        });
                                    } else {
                                        navigation.navigate(route.name);
                                    }
                                }
                            }}
                            style={styles.touchable}
                        >
                            {route.name === 'MyJobsStack' ? (
                                <Briefcase
                                    name="briefcase"
                                    color={
                                        focused
                                            ? Color.primaryBrandColor
                                            : Color.secondaryColor
                                    }
                                    size={Layout.menuIconSize}
                                />
                            ) : (
                                <Icon
                                    name={iconName}
                                    color={
                                        focused
                                            ? Color.primaryBrandColor
                                            : Color.secondaryColor
                                    }
                                    size={Layout.menuIconSize}
                                />
                            )}
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
                name="MyJobsStack"
                component={MyJobsStack}
                listeners={() => ({
                    tabPress: () => {},
                })}
            />
            {userType === 'customer' && (
                <Tab.Screen
                    name="FakeNewJob"
                    component={NewJobScreen}
                    listeners={() => ({
                        tabPress: () => {},
                    })}
                />
            )}
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

const styles = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },
});

export default BottomTab;
