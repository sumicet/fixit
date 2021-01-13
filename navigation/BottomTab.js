import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import Color from '../constants/Color';
import Layout from '../constants/Layout';
import Touchable from '../components/common/Touchable';
import NewJobScreen from '../screens/Quiz/NewJobScreen';
import ProfileStack from './ProfileStack';
import MyJobsStack from './MyJobsStack';
import HomeStack from './HomeStack';
import MessagesStack from './MessagesStack';

const Tab = createBottomTabNavigator();

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
                    backgroundColor: Color.textField,
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
                                    if (route.name === 'FakeNewJob') {
                                        iconName = 'plus';
                                    }
                                }
                            }
                        }
                    }

                    return (
                        <Touchable
                            onPress={() => {
                                if (route.name === 'FakeNewJob') {
                                    navigation.navigate('NewJob');
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
                name="FakeNewJob"
                component={NewJobScreen}
                listeners={() => ({
                    tabPress: () => {},
                })}
            />
            <Tab.Screen
                name="Messages"
                component={MessagesStack}
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

const styles = StyleSheet.create({
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },
});

export default BottomTab;
