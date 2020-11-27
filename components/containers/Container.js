import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const Container = props => {
    const barStyle = useSelector(state => state.ui.barStyle);
    const backgroundColor = useSelector(state => state.ui.backgroundColor);

    // useEffect(() => {
    //     dispatch(setStatusBarStyle('dark-content', Color.primaryColor));
    //     console.log('unloaded');
    // }, [backgroundColor]);

    return (
        <View style={styles.container}>
            <View style={[styles.insideContainer, props.style]}>
                {props.children}
            </View>
            <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.primaryColor,
    },
    insideContainer: {
        flex: 1,
        backgroundColor: Color.primaryColor,
        //marginTop: Layout.screenTopMargin,
        paddingTop: Layout.screenVerticalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
    },
});

export default Container;
