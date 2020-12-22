import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';

const TradespersonCard = props => {
    const allTradespeople = useSelector(state => state.tradespeople.all);

    console.log(allTradespeople);

    const {
        userId,
        name,
        occupationsIds,
        streetAddress,
        experienceId,
        insurance,
        rating,
        ratingVotesAmount,
        recommendedByIds,
        profilePicture,
        phoneNumber
    } = props;

    const recommendedByTradespeople = recommendedByIds
        ? allTradespeople.filter(tp =>
              recommendedByIds.includes(parseInt(tp.userId))
          )
        : [];

    const [modalVisible, setModalVisible] = useState(false);
    const [updatedRating, setUpdatedRating] = useState(rating);

    const occupations = [];

    occupations.push(<HouseIcon key={1} />);
    occupations.push(<StoreIcon key={2} />);
    occupations.push(<FactoryIcon key={3} />);

    const onCardPress = index => {
        if (props.isRateCard) {
            setModalVisible(true);
        } else {
            props.navigation.navigate('TradespersonProfile', {
                tradespersonId: userId,
            });
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

    const handleStarPress = updatedRating => {
        setModalVisible(true);
        setUpdatedRating(updatedRating);
    };

    return (
        <View>
            <RateTradespersonModal
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                updatedRating={updatedRating}
                setUpdatedRating={setUpdatedRating}
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
                            <ProfilePicture
                                isRateCard={props.isRateCard}
                                profilePicture={profilePicture}
                                ratingVotesAmount={ratingVotesAmount}
                            />
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
                                        <HeaderWithEllipsis
                                            style={{
                                                color:
                                                    Color.textOnTertiaryColorBackground,
                                            }}
                                        >
                                            {name}
                                        </HeaderWithEllipsis>
                                    </View>
                                    {props.isRateCard ? null : <Contact phoneNumber={phoneNumber} />}
                                </View>
                                <View style={{ paddingBottom: 5 }}>
                                    <Occupations
                                        isRateCard={props.isRateCard}
                                        occupationsIds={occupationsIds}
                                    />
                                </View>
                                {!props.isRateCard && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            width: '100%',
                                            paddingBottom: 5,
                                        }}
                                    >
                                        <Location
                                            place_id={streetAddress.place_id}
                                        />
                                        <Experience
                                            experienceId={experienceId}
                                        />
                                        {insurance && <Insurance />}
                                    </View>
                                )}
                                {!props.isBeingRated && (
                                    <Rating
                                        rating={
                                            props.isRateCard
                                                ? updatedRating
                                                : rating
                                        }
                                        isRateCard={props.isRateCard}
                                        onStarPress={handleStarPress}
                                        readOnly={
                                            props.isRateCard ? false : true
                                        }
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                    {!props.isRateCard &&
                        (props.hasQuote ? (
                            <View style={styles.bottomContainer}>
                                <Header
                                    style={{
                                        color:
                                            Color.importantTextOnTertiaryColorBackground,
                                    }}
                                >
                                    {props.quote}
                                </Header>
                            </View>
                        ) : (
                            recommendedByIds && (
                                <View style={styles.bottomContainer}>
                                    <SmallContentWithEllipsis
                                        style={{
                                            color:
                                                Color.textOnTertiaryColorBackground,
                                        }}
                                    >
                                        Recommended by:{' '}
                                        {recommendedByTradespeople.map(
                                            (tp, index) => {
                                                if (
                                                    index !==
                                                    recommendedByTradespeople.length -
                                                        1
                                                )
                                                    return tp.name + ', ';
                                                else return tp.name;
                                            }
                                        )}
                                    </SmallContentWithEllipsis>
                                </View>
                            )
                        ))}
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
