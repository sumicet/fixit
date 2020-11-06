import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';

const BottomMenu = props => {

    console.log(props.screen);

    const [activeScreen, setActiveScreen] = useState(props.screen); //Home

    useEffect(() => {
        if(props.screen) {
            setActiveScreen(props.screen);
        }
    }, [])

    const isActive = index => {
        if(activeScreen === index) return true; else return false;
    };

    return (
        <View style={styles.container}>
        <Touchable
            onPress={() => {
                props.navigation.navigate('Home');
                setActiveScreen(1);
            }}
            style={styles.touchable}
        >
            <Icon
                name='home'
                color={
                    isActive(1)
                        ? Color.primaryBrandColor
                        : Color.textColor
                }
                size={Layout.menuIconSize}
            />
        </Touchable>
        <Touchable
            onPress={() => {
                props.navigation.navigate('MyJobs');
                setActiveScreen(2);
            }}
            style={styles.touchable}
        >
            <Icon
                name='solution1'
                color={
                    isActive(2)
                        ? Color.primaryBrandColor
                        : Color.textColor
                }
                size={Layout.menuIconSize}
            />
        </Touchable>
        <Touchable
            onPress={() => {
                props.navigation.navigate('Messages');
                setActiveScreen(3);
            }}
            style={styles.touchable}
        >
            <Icon
                name='message1'
                color={
                    isActive(3)
                        ? Color.primaryBrandColor
                        : Color.textColor
                }
                size={Layout.menuIconSize}
            />
        </Touchable>
        <Touchable
            onPress={() => {
                props.navigation.navigate('Profile');
                setActiveScreen(4);
            }}
            style={styles.touchable}
        >
            <Icon
                name='user'
                color={
                    isActive(4)
                        ? Color.primaryBrandColor
                        : Color.textColor
                }
                size={Layout.menuIconSize}
            />
        </Touchable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Layout.menuHeight,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Color.primaryColor,
        borderTopWidth: Layout.borderWidth,
        borderTopColor: Color.secondaryColor,
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },
});

export default BottomMenu;
