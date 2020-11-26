import React from 'react';
import { View, StyleSheet } from 'react-native';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import SmallContent from '../../text/SmallContent';
import SmallBoldContent from '../../text/SmallBoldContent';
import PostedBy from '../Job/PostedBy';

const Screen = props => {
    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <PostedBy />
            </View>
            <View style={styles.line}>
                <SmallBoldContent>Amazing!</SmallBoldContent>
            </View>
            <View style={styles.line}>
                <SmallContent>Did a great job.</SmallContent>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: Color.textField,
        borderRadius: Layout.borderRadius,
        padding: Layout.generalPadding,
        marginBottom: Layout.cardMargin,
    },
    line: {
        paddingBottom: 5,
    },
});

export default Screen;
