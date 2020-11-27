import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import TitledScrollableContainer from '../../components/containers/TitledScrollableContainer';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import { setStatusBarStyle } from '../../store/actions/ui';

const SectionedContainer = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(setStatusBarStyle('light'));
            console.log('loaded');
        });

        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            dispatch(setStatusBarStyle('dark'));
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <TitledScrollableContainer
            title={props.title}
            titleColor={Color.primaryBrandColor}
            backgroundColor={Color.tertiaryBrandColor}
            rightOfTitleComponent={props.rightOfTitleComponent}
        >
            <View style={{ backgroundColor: Color.textField }}>
                <View style={styles.topContainer}>{props.topComponent}</View>
            </View>
            <View style={styles.midContainer}>{props.midComponent}</View>
            <View style={styles.bottomContainer}>{props.bottomComponent}</View>
        </TitledScrollableContainer>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: Color.tertiaryBrandColor,
        paddingHorizontal: Layout.screenHorizontalPadding,
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius,
    },
    midContainer: {
        paddingTop: Layout.screenHorizontalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
        width: '100%',
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius,
        backgroundColor: Color.textField,
        paddingBottom: Layout.screenHorizontalPadding - Layout.generalPadding,
    },
    bottomContainer: {
        paddingTop: Layout.screenHorizontalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
        width: '100%',
    },
});

export default SectionedContainer;
