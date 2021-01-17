import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Color from '../../constants/Color';

const Loading = props => {
    return (
        <View style={[styles.center, props.style]}>
            <ActivityIndicator
                size="large"
                color={props.spinnerColor ? props.spinnerColor : Color.placeholderTextColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;
