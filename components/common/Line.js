import React from 'react';
import {View, StyleSheet} from 'react-native';

import Layout from '../../constants/Layout';

const Line = (props) => {
    return (
        <View style={[styles.line, props.style]}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    line: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Layout.screenHorizontalPadding,
    },
})

export default Line;