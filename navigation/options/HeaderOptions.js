import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';


export const coloredHeaderOptions = {
    headerTitle: '',
    headerStyle: {
        shadowColor: 'transparent',
        borderBottomWidth: 0, //for ios?
        elevation: 0,
        backgroundColor: Color.tertiaryBrandColor,
    },
    headerTitleStyle: {
        color: Color.importantTextOnTertiaryColorBackground,
        fontFamily: 'SemiBold',
        fontSize: 20
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

export const headerOptions = {
    headerStyle: {
        shadowColor: 'transparent',
        borderBottomWidth: 0, //for ios?
        elevation: 0,
        backgroundColor: Color.primaryColor,
    },
    headerTitleStyle: {
        color: Color.importantTextOnTertiaryColorBackground,
        fontFamily: 'SemiBold',
        fontSize: 20
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