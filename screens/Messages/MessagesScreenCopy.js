import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Line from '../../components/common/Line';
import Touchable from '../../components/common/Touchable';
import Color from '../../constants/Color';

const MessagesScreenCopy = props => {

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Color.primaryColor,
            }}
        >
            <Line style={{ flex: 0 }}>
                <View
                    style={{
                        backgroundColor: 'pink',
                        height: 100,
                        width: 100,
                    }}
                ></View>
            </Line>
        </View>
    );
};

const styles = StyleSheet.create({});

export default MessagesScreenCopy;
