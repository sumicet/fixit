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
            ]}
        >
            {props.isTitle ? (
                <HeaderWithEllipsis>
                    Plumber
                </HeaderWithEllipsis>
            ) : (
                <SmallContentWithEllipsis>
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
