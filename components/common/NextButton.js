import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Touchable from './Touchable';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const NextButton = props => {
    return (
        <Touchable {...props}>
            <View
                style={{
                    width: 70,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: Layout.borderRadius,
                }}
            >
                <Icon
                    name="right"
                    size={Layout.menuIconSize}
                    color={Color.primaryBrandColor}
                />
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({});

export default NextButton;
