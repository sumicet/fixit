import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

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
import Header from '../../text/Header';
import Contact from './Contact';
import ProfilePicture from './ProfilePicture';
import Touchable from '../../common/Touchable';
import RateTradespersonModal from '../../modals/RateTradespersonModal';

const TradespersonCard = props => {
    const [modalVisible, setModalVisible] = useState(false);

    const occupations = [];

    occupations.push(<HouseIcon key={1} />);
    occupations.push(<StoreIcon key={2} />);
    occupations.push(<FactoryIcon key={3} />);

    const onCardPress = index => {
        if (props.isRateCard) {
            setModalVisible(true);
        } else {
            props.navigation.navigate('TradespersonProfile');
        }
    };

    const LocalContainer = props => {
        if (props.isBeingRated) {
            return <View>{props.children}</View>;
        } else {
            return (
                <Touchable
                    isCard={true}
                    onPress={onCardPress}
                    style={{ flex: 0 }}
                >
                    {props.children}
                </Touchable>
            );
        }
    };

    return (
        <View>
            <RateTradespersonModal
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
            />
            <LocalContainer isBeingRated={props.isBeingRated}>
                <View
                    style={[
                        styles.container,
                        {
                            width: props.isBeingRated
                                ? 300
                                : props.isRateCard
                                ? 250
                                : 'auto',
                            //height: props.isBeingRated ? '100%' : 'auto',
                            marginVertical: props.isBeingRated
                                ? 0
                                : Layout.cardMargin,
                            backgroundColor: props.isBeingRated
                                ? Color.starColor
                                : Color.textField,
                        },
                    ]}
                >
                    <View style={styles.topContainer}>
                        <View
                            style={{
                                flexDirection: props.isRateCard
                                    ? 'column'
                                    : 'row',
                                alignItems: 'center',
                            }}
                        >
                            <ProfilePicture isRateCard={props.isRateCard} />
                            <View
                                style={{
                                    flex: props.isBeingRated ? 0 : 1,
                                    justifyContent: 'center',
                                    alignItems: props.isRateCard
                                        ? 'center'
                                        : 'flex-start',
                                }}
                            >
                                <View
                                    style={{
                                        paddingBottom: 5,
                                        flexDirection: 'row',
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: props.isRateCard
                                                ? 'center'
                                                : 'flex-start',
                                        }}
                                    >
                                        <HeaderWithEllipsis>
                                            John McCormack
                                        </HeaderWithEllipsis>
                                    </View>
                                    {props.isRateCard ? null : <Contact />}
                                </View>
                                <View style={{ paddingBottom: 5 }}>
                                    <Occupations
                                        isRateCard={props.isRateCard}
                                    />
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
                                {props.isBeingRated ? null : (
                                    <Rating
                                        rating={4.5}
                                        isRateCard={props.isRateCard}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                    {props.isRateCard ? null : (
                        <View style={styles.bottomContainer}>
                            {props.hasQuote ? (
                                <Header>{props.quote}</Header>
                            ) : (
                                <SmallContentWithEllipsis
                                    style={{
                                        color: Color.secondaryColor,
                                        fontFamily: 'asap-semibold',
                                    }}
                                >
                                    Recommended by: Mister Beast, John Doe,
                                    Scott McCormack
                                </SmallContentWithEllipsis>
                            )}
                        </View>
                    )}
                </View>
            </LocalContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        borderRadius: Layout.borderRadius,
    },
    topContainer: {
        flex: 0,
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
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
