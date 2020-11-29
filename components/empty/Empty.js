import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmptyIcon from '../../assets/icons/Miscellaneous/EmptyIcon';
import SmallContent from '../text/SmallContent';
import Color from '../../constants/Color';
import Line from '../common/Line';

const Empty = props => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Line style={{ flex: 0 }}>
                <EmptyIcon />
            </Line>
            <Line style={{ flex: 0 }}>
                <SmallContent style={{ color: Color.placeholderTextColor }}>
                    Nothing to see here..
                </SmallContent>
            </Line>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Empty;
