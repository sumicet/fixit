import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Call from 'react-native-vector-icons/Ionicons';
import call from 'react-native-phone-call'

import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import Touchable from '../../common/Touchable';

const Contact = props => {

    const handleCallPress = () => {
        call({number: '0757570851', prompt: true}).catch(console.error);
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                flex: 0,
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingLeft: Layout.generalPadding,
            }}
        >
            <Touchable onPress={handleCallPress} style={{ flex: 0 }}>
                <View
                    style={{
                        paddingLeft:
                            Layout.generalMargin - Layout.generalPadding,
                        paddingRight: Layout.generalMargin / 2,
                    }}
                >
                    <Call
                        name="ios-call"
                        color={Color.primaryBrandColor}
                        size={Layout.menuIconSize}
                    />
                </View>
            </Touchable>
            <Touchable onPress={() => {}} style={{ flex: 0 }}>
                <View
                    style={{
                        paddingLeft: Layout.generalMargin / 2,
                        paddingRight:
                            Layout.generalMargin - Layout.generalPadding,
                    }}
                >
                    <Icon
                        name="message-text"
                        color={Color.primaryBrandColor}
                        size={Layout.menuIconSize}
                    />
                </View>
            </Touchable>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Contact;
