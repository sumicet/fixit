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
import RateTradespersonModal from '../../modals/RateTradespersonModal';
import { useSelector } from 'react-redux';
import Loading from '../../loading/Loading';
import { getText } from '../../../actions/distance';

const TradespersonCard = props => {
    const [isLoading, setIsLoading] = useState(true);

    const allTradespeople = useSelector(state => state.tradespeople.all);

    const user_place_id = useSelector(state => state.tradesperson.streetAddress)
        .place_id;
    const [distance, setDistance] = useState();

    useEffect(() => {
        console.log('ye', user_place_id, streetAddress.place_id)
        if(user_place_id && streetAddress) {
            getText(user_place_id, streetAddress.place_id).then(result => {
                setDistance(result);
                setIsLoading(false);
            })
        } else {
            setDistance('N/A');
            setIsLoading(false);
        }
    }, []);

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

    const onCardPress = () => {
        if (props.isRateCard) {
            setModalVisible(true);
        } else {
            props.navigation.navigate('TradespersonProfile', {
                screen: 'TradespersonProfile',
                params: { userId },
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

    if(isLoading) {
        return <Loading />
    }

    return (
        <View>
            <RateTradespersonModal
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                updatedRating={updatedRating}
                setUpdatedRating={setUpdatedRating}
            />
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
                                    paddingTop: Layout.generalPadding,
                                    paddingHorizontal: Layout.generalPadding,
                                    paddingBottom: 5,
                                    borderRadius: Layout.borderRadius,
                                }}
                            >
                                {insurance && (
                                    <View
                                        style={{
                                            paddingRight: Layout.generalPadding,
                                        }}
                                    >
                                        <Shield
                                            name="shield-check"
                                            color={Color.secondaryColor}
                                            size={18}
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
                                    <Contact phoneNumber={phoneNumber} />
                                )}
                            </View>
                            <View
                                style={{
                                    flexDirection: props.isRateCard
                                        ? 'column'
                                        : 'row',
                                    alignItems: 'center',
                                    //backgroundColor: 'yellow',
                                    paddingHorizontal: Layout.generalPadding,
                                    paddingBottom: Layout.generalPadding,
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
                                            <Location distance={distance} />
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
