import React from 'react';
import { View, StyleSheet } from 'react-native';

import SmallContentWithEllipsis from '../../text/SmallContentWithEllipsis';

const Occupations = props => {
    return (
        <View style={[styles.container, {justifyContent: props.isRateCard ? 'center' : 'flex-start'}]}>
            <SmallContentWithEllipsis>
                Plumber • Builder • Heating Eng. • Painter • Electrician
            </SmallContentWithEllipsis>
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
