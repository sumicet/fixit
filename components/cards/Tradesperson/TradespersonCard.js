import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import Occupations from './Occupations';
import Header from '../../text/Header';
import Rating from './Rating';
import SmallContent from '../../text/SmallContent';
import ExperienceIcon from '../../../assets/icons/User/ExperienceIcon';

const TradespersonCard = props => {
    return (
        <View style={[styles.container, props.style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={{
                        height: 60,
                        width: 60,
                        marginRight: Layout.generalPadding,
                    }}
                >
                    <Image
                        style={styles.profilePicture}
                        source={{
                            uri:
                                'https://onegov.nsw.gov.au/New/persistent/launchpad_images/contractors_Tradespersons.jpg',
                        }}
                        resizeMethod="scale"
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <View style={{ paddingBottom: 5 }}>
                        <Header>John McCormack</Header>
                    </View>
                    <View style={{ paddingBottom: 5 }}>
                        <Occupations />
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Rating />
                        <SmallContent style={{ color: Color.secondaryColor }}>
                            {' '}
                            •{' '}
                        </SmallContent>
                        <ExperienceIcon />
                        <SmallContent style={{ color: Color.secondaryColor }}>
                            {' '}
                            10y
                        </SmallContent>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
        marginVertical: Layout.cardMargin,
        backgroundColor: Color.textField,
    },
    profilePicture: {
        height: 60,
        width: 60,
        borderRadius: 100,
        marginRight: Layout.generalMargin,
    },
});

export default TradespersonCard;
