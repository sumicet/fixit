import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Shield from 'react-native-vector-icons/MaterialCommunityIcons';

import SmallContent from '../../text/SmallContent';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';

const Insurance = props => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: Layout.generalPadding,
            }}
        >
            <Shield
                name="shield-check"
                color={Color.secondaryColor}
                size={17}
            />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                liability insurance
            </SmallContent>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Insurance;
