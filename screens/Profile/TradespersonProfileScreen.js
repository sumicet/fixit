import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Layout from '../../constants/Layout';
import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';
import Contact from '../../components/cards/Tradesperson/Contact';
import Occupations from '../../components/cards/Tradesperson/Occupations';
import Location from '../../components/cards/Tradesperson/Location';
import Experience from '../../components/cards/Tradesperson/Experience';
import Insurance from '../../components/cards/Tradesperson/Insurance';
import Color from '../../constants/Color';
import SmallContent from '../../components/text/SmallContent';
import Residential from '../../components/cards/Tradesperson/Residential';
import Commercial from '../../components/cards/Tradesperson/Commercial';
import Industrial from '../../components/cards/Tradesperson/Industrial';
import Header from '../../components/text/Header';
import Rating from '../../components/cards/Tradesperson/Rating';
import Review from '../../components/cards/Review/Review';
import SectionedContainer from '../../components/containers/SectionedContainer';
import Line from '../../components/common/Line';
import Touchable from '../../components/common/Touchable';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { getText } from '../../actions/distance';
import LineDescription from '../../components/common/LineDescription';
import EndOfPageSpace from '../../components/layout/EndOfPageSpace';
import Empty from '../../components/empty/Empty';

const TradespersonProfileScreen = props => {
    const userId = props.route.params && props.route.params.userId;
    const reviews = useSelector(state => state.reviews.all).filter(
        review => review.tradespersonId === userId
    );

    const street = useSelector(state => state.auth.streetAddress);
    const user_place_id = street.place_id;
    const [distance, setDistance] = useState();

    useEffect(() => {
        user_place_id && tradesperson.streetAddress
            ? getText(user_place_id, tradesperson.streetAddress.place_id).then(
                  result => {
                      setDistance(result);
                  }
              )
            : setDistance('N/A');
    }, []);

    const currentUserId = useSelector(state => state.auth.userId);
    const currentUserReview = reviews.find(
        review => review.userId === currentUserId
    );

    const tradesperson = useSelector(state => state.tradespeople.all).find(
        elem => elem.userId === userId
    );

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: tradesperson.name,
            headerRight: currentUserId === tradesperson.userId && headerRight,
        });
    }, []);

    const headerRight = () => {
        return (
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                }}
            >
                <Touchable
                    style={{
                        flex: 0,
                        padding: Layout.screenHorizontalPadding / 2,
                    }}
                    onPress={() => {
                        props.navigation.navigate('EditTradespersonProfile', {
                            id: currentUserId,
                        });
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Icon
                            name="edit"
                            color={Color.importantTextOnTertiaryColorBackground}
                            size={Layout.menuIconSize}
                        />
                    </View>
                </Touchable>
            </View>
        );
    };

    const TopComponent = () => {
        return (
            <View>
                <Line>
                    <ProfilePicture
                        isRateCard={true}
                        isLarge={true}
                        profilePicture={tradesperson.profilePicture}
                    />
                </Line>
                <Line>
                    <Occupations
                        occupationsIds={tradesperson.occupationsIds}
                        isOnProfileScreen={true}
                    />
                </Line>
                <Line>
                    <Contact
                        iconColor={Color.importantTextOnTertiaryColorBackground}
                        showLabels={true}
                        containerStyle={styles.contactContainer}
                        phoneNumber={tradesperson.phoneNumber}
                    />
                </Line>
            </View>
        );
    };

    const getTwoColumnsElemPropertyTypes = elem => {
        if (elem === 1) {
            return <Residential />;
        }
        if (elem === 2) {
            return <Commercial />;
        }
        return <Industrial />;
    };

    const MakeTwoColumns = props => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {[0, 1].map(i => {
                    return (
                        <View style={styles.column}>
                            {props.array.map((elem, index) => {
                                if (index % 2 === i) {
                                    const result = props.getTwoColumnsElem(
                                        elem
                                    );
                                    return (
                                        <View style={styles.details}>
                                            {result}
                                        </View>
                                    );
                                }
                            })}
                        </View>
                    );
                })}
            </View>
        );
    };

    const MidComponent = () => {
        return (
            <View>
                <View style={{ paddingBottom: Layout.generalPadding }}>
                    <Header style={{ textAlign: 'left' }}>Perks</Header>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.column}>
                        <View style={styles.details}>
                            <Location distance={distance} />
                            <SmallContent
                                style={{ color: Color.secondaryColor }}
                            >
                                {' '}
                                away
                            </SmallContent>
                        </View>

                        {/* TODO change this */}
                        {tradesperson.insurance && (
                            <View style={styles.details}>
                                <Insurance style={{ paddingLeft: 0 }} />
                            </View>
                        )}
                    </View>
                    <View style={styles.column}>
                        {/* TODO completed jobs
                        <View style={styles.details}>
                            <CompletedJobs />
                        </View> */}
                        <View style={styles.details}>
                            <Experience
                                style={{ paddingLeft: 0 }}
                                experienceId={tradesperson.experienceId}
                            />
                            <SmallContent
                                style={{ color: Color.secondaryColor }}
                            >
                                {' '}
                                experience
                            </SmallContent>
                        </View>
                    </View>
                </View>

                <View>
                    <Header style={{ textAlign: 'left' }}>Work types</Header>
                </View>

                <View
                    style={{
                        //flexDirection: 'row',
                        paddingTop: Layout.generalPadding,
                    }}
                >
                    <MakeTwoColumns
                        array={tradesperson.propertyTypesIds}
                        getTwoColumnsElem={getTwoColumnsElemPropertyTypes}
                    />
                    {/* <View style={styles.column}>
                        <View style={styles.details}>
                            <Residential />
                        </View>
                        <View style={styles.details}>
                            <Industrial />
                        </View>
                    </View>
                    <View style={styles.column}>
                        <View style={styles.details}>
                            <Commercial />
                        </View>
                    </View> */}
                </View>
                <View style={{ paddingBottom: Layout.generalPadding }}>
                    <Header style={{ textAlign: 'left' }}>Schedule</Header>
                </View>

                <View
                    style={{
                        paddingBottom: Layout.generalPadding,
                        flex: 1,
                    }}
                >
                    <SmallContent style={{ color: Color.secondaryColor }}>
                        {tradesperson.schedule ? tradesperson.schedule : 'N/A'}
                    </SmallContent>
                </View>
            </View>
        );
    };

    const BottomComponent = () => {
        return (
            <View>
                <View
                    style={{
                        paddingBottom: Layout.screenHorizontalPadding,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Header
                        style={{
                            textAlign: 'left',
                            color: Color.textOnTertiaryColorBackground,
                        }}
                    >
                        Rating:{' '}
                    </Header>
                    <Rating
                        rating={tradesperson.rating}
                        ratingVotesAmount={tradesperson.ratingVotesAmount}
                        color={Color.textOnTertiaryColorBackground}
                        readOnly={true}
                        size="medium"
                    />
                    {tradesperson.userId !== currentUserId && (
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Touchable
                                style={{
                                    flex: 0,
                                    backgroundColor: Color.primaryBrandColor,
                                    paddingHorizontal: Layout.generalPadding,
                                    paddingVertical: 3,
                                    borderRadius: Layout.borderRadius,
                                }}
                            >
                                <SmallContent
                                    style={{
                                        fontFamily: 'Asap-SemiBold',
                                        color:
                                            Color.importantTextOnTertiaryColorBackground,
                                    }}
                                    onPress={() => {
                                        props.navigation.navigate('Review', {
                                            tradesperson: tradesperson,
                                            oldReview: currentUserReview,
                                        });
                                    }}
                                >
                                    {currentUserReview
                                        ? 'Edit your review'
                                        : 'Write a review'}
                                </SmallContent>
                            </Touchable>
                        </View>
                    )}
                </View>

                {currentUserReview && (
                    <View
                        style={{
                            paddingBottom:
                                Layout.screenHorizontalPadding -
                                Layout.generalPadding,
                        }}
                    >
                        <LineDescription
                            text="Your review"
                            style={{ paddingBottom: Layout.generalPadding }}
                        />
                        <Review review={currentUserReview} />
                    </View>
                )}
                <LineDescription
                    text="Ratings and reviews"
                    style={{ paddingBottom: Layout.generalPadding }}
                />
            </View>
        );
    };

    return (
        <View style={{ backgroundColor: Color.primaryColor, flex: 1 }}>
            <FlatList
                data={reviews}
                keyExtractor={(item, i) => `key-${i}`}
                renderItem={itemData => (
                    <View
                        style={{
                            paddingHorizontal: Layout.screenHorizontalPadding,
                        }}
                    >
                        <Review review={itemData.item} />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            paddingTop:
                                Layout.screenHorizontalPadding -
                                Layout.generalPadding,
                        }}
                    >
                        <Empty
                            size="small"
                            message="Be the first one to add a review!"
                        />
                    </View>
                )}
                ListHeaderComponent={() => (
                    <SectionedContainer
                        topComponent={<TopComponent />}
                        midComponent={<MidComponent />}
                        bottomComponent={<BottomComponent />}
                        navigation={props.navigation}
                    />
                )}
                ListFooterComponent={() => <EndOfPageSpace />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: Color.tertiaryBrandColor,
        paddingHorizontal: Layout.screenHorizontalPadding,
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius,
    },
    midContainer: {
        paddingTop: Layout.screenHorizontalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
        width: '100%',
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius,
        backgroundColor: Color.textField,
        paddingBottom: Layout.screenHorizontalPadding - Layout.generalPadding,
    },
    bottomContainer: {
        paddingTop: Layout.screenHorizontalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
        width: '100%',
    },
    line: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Layout.screenHorizontalPadding,
    },
    column: {
        flex: 1,
    },
    contactContainer: {
        justifyContent: 'space-around',
        flex: 1,
        paddingLeft: 0,
        width: '100%',
    },
    details: {
        flexDirection: 'row',
        paddingBottom: Layout.generalPadding,
    },
});

export default TradespersonProfileScreen;
