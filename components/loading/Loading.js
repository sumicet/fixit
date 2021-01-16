import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Color from '../../constants/Color';

const Loading = () => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color={Color.placeholderTextColor} />
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