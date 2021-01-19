import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Color from '../../constants/Color';

const Loading = props => {
    return (
        <View style={[styles.container, props.style]}>
            <ActivityIndicator
                size="large"
                color={props.spinnerColor ? props.spinnerColor : Color.placeholderTextColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.primaryColor
    },
});

export default Loading;
