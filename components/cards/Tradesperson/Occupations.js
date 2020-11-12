import React from 'react';
import { View, StyleSheet } from 'react-native';

import SmallContentWithEllipsis from '../../text/SmallContentWithEllipsis';
import HeaderWithEllipsis from '../../text/HeaderWithEllipsis';

const Occupations = props => {
    return (
        <View
            style={[
                styles.container,
                { justifyContent: props.isRateCard ? 'center' : 'flex-start' },
                props.styles
            ]}
        >
            {props.isTitle ? (
                <HeaderWithEllipsis style={props.textColor ? {color: props.textColor} : null}>
                    Plumber
                </HeaderWithEllipsis>
            ) : (
                <SmallContentWithEllipsis style={props.textColor ? {color: props.textColor} : null}>
                    Plumber • Builder • Heating Eng. • Painter • Electrician
                </SmallContentWithEllipsis>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Occupations;
