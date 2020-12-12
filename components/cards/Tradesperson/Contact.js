import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Call from 'react-native-vector-icons/Ionicons';
import call from 'react-native-phone-call';

import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import Touchable from '../../common/Touchable';
import SuperSmallContent from '../../text/SuperSmallContent';

const Contact = props => {
    const handleCallPress = () => {
        call({ number: '0757570851', prompt: true }).catch(console.error);
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            <Touchable onPress={handleCallPress} style={{ flex: 0 }}>
                <View style={styles.call}>
                    <Call
                        name="ios-call"
                        color={
                            props.iconColor
                                ? props.iconColor
                                : Color.primaryBrandColor
                        }
                        size={Layout.menuIconSize}
                    />
                    {props.showLabels && (
                        <SuperSmallContent
                            style={{
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                            }}
                        >
                            Call
                        </SuperSmallContent>
                    )}
                </View>
            </Touchable>
            <Touchable onPress={() => {}} style={{ flex: 0 }}>
                <View style={styles.message}>
                    <Icon
                        name="message-text"
                        color={
                            props.iconColor
                                ? props.iconColor
                                : Color.primaryBrandColor
                        }
                        size={Layout.menuIconSize}
                    />
                    {props.showLabels && (
                        <SuperSmallContent
                            style={{
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                            }}
                        >
                            Message
                        </SuperSmallContent>
                    )}
                </View>
            </Touchable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: Layout.generalPadding,
    },
    call: {
        paddingLeft: Layout.generalMargin - Layout.generalPadding,
        paddingRight: Layout.generalMargin / 2,
        alignItems: 'center',
    },
    message: {
        paddingLeft: Layout.generalMargin / 2,
        paddingRight: Layout.generalMargin - Layout.generalPadding,
        alignItems: 'center',
    },
});

export default Contact;
