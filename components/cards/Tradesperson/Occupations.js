import React from 'react';
import { View, StyleSheet } from 'react-native';

import SmallContentWithEllipsis from '../../text/SmallContentWithEllipsis';
import HeaderWithEllipsis from '../../text/HeaderWithEllipsis';
import Header from '../../text/Header';
import { OCCUPATIONS } from '../../../data/Jobs/Occupations';
import Color from '../../../constants/Color';

const Occupations = props => {
    const occupationsIds = props.occupationsIds ? props.occupationsIds : [];
    const occList = OCCUPATIONS.filter(occ => occupationsIds.includes(occ.id));

    return (
        <View
            style={[
                styles.container,
                { justifyContent: props.isRateCard ? 'center' : 'flex-start' },
                props.style,
            ]}
        >
            {props.isTitle ? (
                <HeaderWithEllipsis
                    style={props.textColor && { color: props.textColor }}
                >
                    {occList &&
                        occList.length > 0 &&
                        occList.map((elem, index) => {
                            if (index !== occList.length - 1) {
                                return elem.name + ' • ';
                            } else {
                                return elem.name;
                            }
                        })}
                </HeaderWithEllipsis>
            ) : props.isOnProfileScreen ? (
                <Header
                    style={{
                        color: Color.textOnTertiaryColorBackground,
                        fontFamily: 'Regular',
                    }}
                >
                    {occList &&
                        occList.length > 0 &&
                        occList.map((elem, index) => {
                            if (index !== occList.length - 1) {
                                return elem.name + ' • ';
                            } else {
                                return elem.name;
                            }
                        })}
                </Header>
            ) : (
                <SmallContentWithEllipsis
                    style={props.textColor && { color: props.textColor }}
                >
                    {occList &&
                        occList.length > 0 &&
                        occList.map((elem, index) => {
                            if (index !== occList.length - 1) {
                                return elem.name + ' • ';
                            } else {
                                return elem.name;
                            }
                        })}
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
