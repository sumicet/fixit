import 'react-native-gesture-handler';
import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import MyJobsScreen from '../screens/MyJobs/MyJobsScreen';
import { View } from 'react-native';
import Header from '../components/text/Header';
import Color from '../constants/Color';
import { StatusBar } from 'react-native';
import Touchable from '../components/common/Touchable';
import Layout from '../constants/Layout';
import QuotesScreen from '../screens/Quotes/QuotesScreen';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const MyJobsStackWithCustomHeader = () => {
    const userType = useSelector(state => state.auth.userType);

    const HeaderColumn = props => {
        return (
            <View>
                <Touchable
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: Layout.generalPadding,
                        flex: 1,
                        width: Dimensions.get('screen').width / 2,
                    }}
                    onPress={props.onPress}
                    isCard={true}
                >
                    <View
                        style={{
                            paddingRight: Layout.generalPadding,
                            height: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            name={props.iconName}
                            color={Color.textOnTertiaryColorBackground}
                            size={Layout.cardIconSize}
                        />
                    </View>
                    <Header
                        style={{
                            color: Color.textOnTertiaryColorBackground,
                            textAlign: 'center',
                            fontSize: 20,
                        }}
                    >
                        {props.text}
                    </Header>
                </Touchable>

                <View
                    style={{
                        backgroundColor: props.active
                            ? Color.textOnTertiaryColorBackground
                            : 'transparent',
                        height: 3,
                        marginHorizontal: Layout.borderRadius,
                    }}
                />
            </View>
        );
    };

    return (
        <Stack.Navigator
            headerMode="float"
            animation
            screenOptions={({ navigation, route }) => ({
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                header: props => (
                    <View
                        style={{
                            backgroundColor: Color.primaryColor,
                            paddingBottom: Layout.screenHorizontalPadding,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: Color.tertiaryBrandColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 80 - StatusBar.currentHeight,
                                paddingBottom: Layout.generalPadding,
                            }}
                        >
                            <Header
                                style={{
                                    color:
                                        Color.importantTextOnTertiaryColorBackground,
                                    fontFamily: 'SemiBold',
                                    fontSize: 20,
                                }}
                            >
                                My Jobs
                            </Header>
                        </View>
                        <View
                            style={{
                                backgroundColor: Color.tertiaryBrandColor,
                                height: 30 + Layout.generalPadding,
                                alignItems: 'flex-start',
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                borderBottomLeftRadius: Layout.borderRadius,
                                borderBottomRightRadius: Layout.borderRadius,
                            }}
                        >
                            <HeaderColumn
                                text={
                                    userType === 'tradesperson'
                                        ? 'Requests'
                                        : 'Jobs'
                                }
                                iconName="th-list"
                                onPress={() => {
                                    navigation.navigate('MyJobs');
                                }}
                                position="left"
                                active={route.name === 'MyJobs' ? true : false}
                            />
                            <HeaderColumn
                                text={'Quotes'}
                                iconName="shopping-bag"
                                onPress={() => {
                                    navigation.navigate('Quotes');
                                }}
                                position="right"
                                active={route.name === 'Quotes' ? true : false}
                            />
                        </View>
                    </View>
                ),
            })}
        >
            <Stack.Screen
                name="MyJobs"
                component={MyJobsScreen}
                headerMode="float"
            />
            <Stack.Screen
                name="Quotes"
                headerMode="float"
                component={QuotesScreen}
            />
        </Stack.Navigator>
    );
};

export default MyJobsStackWithCustomHeader;
