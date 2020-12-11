import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import {
    NavigationContainer,
    useNavigationState,
    useRoute,
} from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

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
import ServicesScreen from '../screens/Service/ServicesScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import SearchBar from '../components/search/SearchBar';
import EditJobScreen from '../screens/Quiz/EditJobScreen';
import NewJobScreen from '../screens/Quiz/NewJobScreen';
import Logo from '../assets/icons/Logo/Logo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const coloredHeaderOptions = {
        headerTitle: '',
        headerStyle: {
            shadowColor: 'transparent',
            borderBottomWidth: 0, //for ios?
            elevation: 0,
            backgroundColor: Color.tertiaryBrandColor,
        },
        headerTitleStyle: {
            color: Color.importantTextOnTertiaryColorBackground,
            fontFamily: 'Asap-SemiBold',
        },
        headerTitleAlign: 'center',
        headerBackImage: () => (
            <Icon
                name="arrowleft"
                size={Layout.menuIconSize}
                color={Color.importantTextOnTertiaryColorBackground}
            />
        ),
    };

    const headerOptions = {
        headerStyle: {
            shadowColor: 'transparent',
            borderBottomWidth: 0, //for ios?
            elevation: 0,
            backgroundColor: Color.primaryColor,
        },
        headerTitleStyle: {
            color: Color.importantTextOnTertiaryColorBackground,
            fontFamily: 'Asap-SemiBold',
        },
        headerTitleAlign: 'center',
        headerBackImage: () => (
            <Icon
                name="arrowleft"
                size={Layout.menuIconSize}
                color={Color.importantTextOnTertiaryColorBackground}
            />
        ),
    };

    const HeaderComponent = props => (
        <View
            style={{
                backgroundColor: Color.primaryColor,
                paddingTop: Layout.screenTopMargin + Layout.generalPadding,
                paddingBottom: Layout.screenVerticalPadding,
                paddingRight: Layout.generalPadding,
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <View>{props.children}</View>
            <View
                style={{
                    flex: 1,
                }}
            >
                <SearchBar navigation={props.navigation} route={props.route} />
            </View>
        </View>
    );

    const HeaderArrowBack = props => (
        <Touchable
            style={{
                flex: 0,
                padding: Layout.generalPadding,
            }}
            onPress={() => {
                props.navigation.goBack();
            }}
        >
            <Icon
                name="arrowleft"
                size={Layout.menuIconSize}
                color={Color.importantTextOnTertiaryColorBackground}
            />
        </Touchable>
    );

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

    const MyJobsStack = () => {
        return (
            <Stack.Navigator
                headerMode="screen"
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen
                    name="MyJobs"
                    component={MyJobsScreen}
                    options={{
                        headerTitle: 'My Jobs',
                        ...headerOptions,
                    }}
                />
                <Stack.Screen
                    name="JobDetails"
                    component={JobDetailsScreen}
                    options={({ navigation, route }) => ({
                        headerTitle: 'Details',
                        ...coloredHeaderOptions,
                    })}
                />
            </Stack.Navigator>
        );
    };

    const ProfileStack = () => {
        return (
            <Stack.Navigator
                headerMode="screen"
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="UserProfile"
                    component={UserProfileScreen}
                />
                <Stack.Screen
                    name="TradespersonProfile"
                    component={TradespersonProfileScreen}
                    options={{
                        headerShown: true,
                        ...coloredHeaderOptions,
                    }}
                />
                <Stack.Screen
                    name="ResetEmailOrPassword"
                    component={ResetEmailOrPasswordStack}
                />
                {/* <Stack.Screen name="Service" component={ServiceStack} /> */}
            </Stack.Navigator>
        );
    };
    const TradespersonProfileStack = () => {
        return (
            <Stack.Navigator
                headerMode="screen"
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen
                    options={{ ...coloredHeaderOptions }}
                    name="TradespersonProfile"
                    component={TradespersonProfileScreen}
                />
            </Stack.Navigator>
        );
    };

    const HomeStackWithSearchBar = () => {
        return (
            <Stack.Navigator
                //animation
                headerMode="float"
                screenOptions={({ route, navigation }) => ({
                    headerStyleInterpolator:
                        HeaderStyleInterpolators.forNoAnimation,
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    header: props => (
                        <HeaderComponent navigation={navigation} route={route}>
                            {route.name === 'Home' ? (
                                <View
                                    style={{
                                        padding: Layout.generalPadding,
                                    }}
                                >
                                    <Logo />
                                </View>
                            ) : (
                                <HeaderArrowBack navigation={navigation} />
                            )}
                        </HeaderComponent>
                    ),
                    headerStyle: {
                        shadowColor: 'transparent',
                        borderBottomWidth: 0, //for ios?
                        elevation: 0,
                        backgroundColor: Color.primaryColor,
                    },
                    headerTitleContainerStyle: {
                        left: 0,
                        right: 0,
                        top: 0,
                    },
                })}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
        );
    };

    const HomeStack = () => {
        return (
            <Stack.Navigator
                //animation
                headerMode="none"
                screenOptions={({ route, navigation }) => ({
                    headerStyleInterpolator:
                        HeaderStyleInterpolators.forNoAnimation,
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
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
            </Stack.Navigator>
        );
    };

    const ResetEmailOrPasswordStack = () => {
        return (
            <Stack.Navigator
                headerMode="screen"
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen
                    name="SelectOption"
                    component={SelectOptionScreen}
                    options={{
                        headerTitle: 'Change account details',
                        ...headerOptions,
                    }}
                />
                <Stack.Screen
                    name="VerifyEmail"
                    component={VerifyEmailScreen}
                    options={{
                        headerTitle: 'Verify email',
                        ...headerOptions,
                    }}
                />
                <Stack.Screen
                    name="VerifyCode"
                    component={VerifyCodeScreen}
                    options={{
                        headerTitle: 'Confirm code',
                        ...headerOptions,
                    }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                    options={{
                        headerTitle: 'Reset password',
                        ...headerOptions,
                    }}
                />
            </Stack.Navigator>
        );
    };

    // const ServiceStack = () => {
    //     return (
    //         <Stack.Navigator
    //             headerMode={false}
    //             animation
    //             screenOptions={{
    //                 cardStyleInterpolator:
    //                     CardStyleInterpolators.forHorizontalIOS,
    //             }}
    //         >
    //             <Stack.Screen name="Services" component={ServicesScreen} />
    //         </Stack.Navigator>
    //     );
    // };

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

    const AppStack = () => {
        return (
            <Stack.Navigator
                headerMode="screen"
                animation
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
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

    return (
        <NavigationContainer>
            <AppStack />
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
