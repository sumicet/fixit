import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';

const HeaderRight = props => {
    return (
        <Touchable
            style={{ flex: 0, paddingRight: 15 }}
            onPress={props.onPress}
        >
            <Icon
                name={props.iconName}
                size={Layout.menuIconSize}
                color={Color.importantTextOnTertiaryColorBackground}
            />
        </Touchable>
    );
};

const styles = StyleSheet.create({});

export default HeaderRight;
