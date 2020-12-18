import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import {
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

import HomeScreen from '../screens/Home/HomeScreen';
import Color from '../constants/Color';
import Layout from '../constants/Layout';
import SearchScreen from '../screens/Home/SearchScreen';
import Logo from '../assets/icons/Logo/Logo';
import SearchBar from '../components/search/SearchBar';
import Touchable from '../components/common/Touchable';

const Stack = createStackNavigator();

const HomeStackWithSearchBar = () => {

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

export default HomeStackWithSearchBar;