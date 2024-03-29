import React, { useEffect, useState, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Shield from 'react-native-vector-icons/MaterialCommunityIcons';

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
import Header from '../../text/Header';
import Contact from './Contact';
import ProfilePicture from './ProfilePicture';
import Touchable from '../../common/Touchable';
import { useSelector } from 'react-redux';
import { getText } from '../../../actions/distance';

const TradespersonCard = props => {
    //const [isLoading, setIsLoading] = useState(true);

    const allTradespeople = useSelector(state => state.tradespeople.unfiltered);

    const street = useSelector(state => state.auth.streetAddress);

    const user_place_id = street && street.place_id;
    //const [distance, setDistance] = useState();

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
        phoneNumber,
        distance
    } = props;

    const dist = getText(distance);    

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

    const onCardPress = () => {
        if (props.isRateCard) {
            setModalVisible(true);
        } else {
            props.navigation.navigate('TradespersonProfile', {
                screen: 'TradespersonProfile',
                params: { tradespersonId: userId },
            });
        }
    };

    const LocalContainer = props => {
        if (props.isBeingRated) {
            return <View>{props.children}</View>;
        } else {
            return props.readOnly ? (
                <View>{props.children}</View>
            ) : (
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

    // if (isLoading) {
    //     return <Loading />;
    // }

    return (
        <View>
            <LocalContainer
                isBeingRated={props.isBeingRated}
                readOnly={props.readOnly}
            >
                <View
                    style={[
                        styles.container,
                        {
                            width: props.isBeingRated
                                ? 300
                                : props.isRateCard
                                ? 250
                                : 'auto',
                            backgroundColor: props.isBeingRated
                                ? Color.starColor
                                : Color.textField,
                        },
                    ]}
                >
                    <View
                        style={{
                            backgroundColor: recommendedByIds
                                ? Color.secondaryBrandColor
                                : 'transparent',
                            borderTopLeftRadius: Layout.borderRadius,
                            borderTopRightRadius: Layout.borderRadius,
                            overflow: 'hidden',
                        }}
                    >
                        <View
                            style={[
                                styles.topContainer,
                                {
                                    backgroundColor: props.isBeingRated
                                        ? Color.starColor
                                        : Color.textField,
                                    borderRadius: Layout.borderRadius,
                                },
                            ]}
                        >
                            <View
                                style={{
                                    //marginBottom: 5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    //backgroundColor: Color.secondaryBrandColor,
                                    paddingTop: Layout.screenHorizontalPadding,
                                    paddingHorizontal:
                                        Layout.screenHorizontalPadding,
                                    paddingBottom: 10,
                                    borderRadius: Layout.borderRadius,
                                }}
                            >
                                {insurance && (
                                    <View
                                        style={{
                                            paddingRight: 10,
                                        }}
                                    >
                                        <Shield
                                            name="shield-check"
                                            color={Color.secondaryColor}
                                            size={Layout.menuIconSize}
                                        />
                                    </View>
                                )}
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
                                {!props.isRateCard && !props.readOnly && (
                                    <Contact
                                        tradespersonId={userId}
                                        phoneNumber={phoneNumber}
                                        onRequestQuote={props.onRequestQuote}
                                    />
                                )}
                            </View>
                            <View
                                style={{
                                    flexDirection: props.isRateCard
                                        ? 'column'
                                        : 'row',
                                    alignItems: 'center',
                                    //backgroundColor: 'yellow',
                                    paddingHorizontal:
                                        Layout.screenHorizontalPadding,
                                    paddingBottom:
                                        Layout.screenHorizontalPadding,
                                    borderRadius: Layout.borderRadius,
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
                                        //backgroundColor: 'red',
                                    }}
                                >
                                    <View style={{ paddingBottom: 10 }}>
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
                                                //paddingBottom: 10,
                                            }}
                                        >
                                            <Location distance={dist} />
                                            <Experience
                                                experienceId={experienceId}
                                            />
                                            {!props.isBeingRated && (
                                                <View
                                                    style={{
                                                        paddingLeft:
                                                            Layout.generalPadding,
                                                    }}
                                                >
                                                    <Rating
                                                        rating={
                                                            props.isRateCard
                                                                ? updatedRating
                                                                : rating
                                                        }
                                                        ratingVotesAmount={
                                                            ratingVotesAmount
                                                        }
                                                        isRateCard={
                                                            props.isRateCard
                                                        }
                                                        onStarPress={
                                                            handleStarPress
                                                        }
                                                        readOnly={
                                                            props.isRateCard
                                                                ? false
                                                                : true
                                                        }
                                                    />
                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>
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
                            recommendedByTradespeople &&
                            recommendedByTradespeople.length > 0 && (
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
    },
    bottomContainer: {
        flex: 0,
        padding: Layout.generalPadding,
        backgroundColor: Color.secondaryBrandColor,
        borderBottomRightRadius: Layout.borderRadius,
        borderBottomLeftRadius: Layout.borderRadius,
    },
});

export default memo(TradespersonCard);
