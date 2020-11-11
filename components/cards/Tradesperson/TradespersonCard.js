import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import Occupations from './Occupations';
import HeaderWithEllipsis from '../../text/HeaderWithEllipsis';
import SmallContentWithEllipsis from '../../text/SmallContentWithEllipsis';
import Rating from './Rating';
import HouseIcon from '../../../assets/icons/Properties/HouseIcon';
import StoreIcon from '../../../assets/icons/Properties/StoreIcon';
import FactoryIcon from '../../../assets/icons/Properties/FactoryIcon';
import Location from './Location';
import Experience from './Experience';
import Insurance from './Insurance';

const TradespersonCard = props => {
    const occupations = [];

    occupations.push(<HouseIcon key={1} />);
    occupations.push(<StoreIcon key={2} />);
    occupations.push(<FactoryIcon key={3} />);

    return (
        <View style={[styles.container, {width: props.isRateCard ? 250 : 'auto'}]}>
            <View style={styles.topContainer}>
                <View
                    style={{
                        flexDirection: props.isRateCard ? 'column' : 'row',
                        alignItems: 'center',
                    }}
                >
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
                            alignItems: props.isRateCard ? 'center' : 'flex-start',
                        }}
                    >
                        <View style={{ paddingBottom: 5 }}>
                            <HeaderWithEllipsis>
                                John McCormack
                            </HeaderWithEllipsis>
                        </View>
                        <View style={{ paddingBottom: 5 }}>
                            <Occupations isRateCard={props.isRateCard} />
                        </View>
                        {props.isRateCard ? null : (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    paddingBottom: 5,
                                }}
                            >
                                <Location />
                                <Experience />
                                <Insurance />
                            </View>
                        )}
                        <Rating />
                    </View>
                </View>
            </View>
            {props.isRateCard ? null : (
                <View style={styles.bottomContainer}>
                    <SmallContentWithEllipsis
                        style={{
                            color: Color.secondaryColor,
                            fontFamily: 'asap-semibold',
                        }}
                    >
                        Recommended by: Mister Beast, John Doe, Scott McCormack
                    </SmallContentWithEllipsis>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        borderRadius: Layout.borderRadius,
        marginVertical: Layout.cardMargin,
        backgroundColor: Color.textField,
    },
    topContainer: {
        flex: 0,
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
        backgroundColor: Color.textField,
    },
    profilePicture: {
        height: 60,
        width: 60,
        borderRadius: 100,
        marginRight: Layout.generalMargin,
    },
    bottomContainer: {
        flex: 0,
        padding: Layout.generalPadding,
        backgroundColor: Color.secondaryBrandColor,
        borderBottomRightRadius: Layout.borderRadius,
        borderBottomLeftRadius: Layout.borderRadius,
    },
});

export default TradespersonCard;

{
    /* <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                            }}
                        >
                            {occupations.map(value => {
                                return (
                                    <View style={{ paddingRight: 3 }}>
                                        {value}
                                    </View>
                                ); // TODO delete padding for the last one
                            })}
                        </View> */
}
