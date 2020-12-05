import React from 'react';
import { View, StyleSheet } from 'react-native';

import SmallContentWithEllipsis from '../../text/SmallContentWithEllipsis';
import HeaderWithEllipsis from '../../text/HeaderWithEllipsis';
import Header from '../../text/Header';
import { OCCUPATIONS } from '../../../data/Jobs/Occupations';
import Color from '../../../constants/Color';

const Occupations = props => {
    return (
        <View
            style={[
                styles.container,
                { justifyContent: props.isRateCard ? 'center' : 'flex-start' },
                props.styles,
            ]}
        >
            {props.isTitle ? (
                <HeaderWithEllipsis
                    style={props.textColor ? { color: props.textColor } : null}
                >
                    {
                        OCCUPATIONS.find(occ => occ.id === props.occupationId)
                            .name
                    }
                </HeaderWithEllipsis>
            ) : props.isOnProfileScreen ? (
                <Header style={{color: Color.textOnTertiaryColorBackground, fontFamily: 'Asap-Regular'}}>
                    Plumber • Builder • Heating Eng. • Painter • Electrician
                </Header>
            ) : (
                <SmallContentWithEllipsis
                    style={props.textColor ? { color: props.textColor } : null}
                >
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
