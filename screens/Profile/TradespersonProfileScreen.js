import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import Layout from '../../constants/Layout';
import ProfilePicture from '../../components/cards/Tradesperson/ProfilePicture';
import Contact from '../../components/cards/Tradesperson/Contact';
import Occupations from '../../components/cards/Tradesperson/Occupations';
import Location from '../../components/cards/Tradesperson/Location';
import Experience from '../../components/cards/Tradesperson/Experience';
import Insurance from '../../components/cards/Tradesperson/Insurance';
import Color from '../../constants/Color';
import SmallContent from '../../components/text/SmallContent';
import CompletedJobs from '../../components/cards/Tradesperson/CompletedJobs';
import Residential from '../../components/cards/Tradesperson/Residential';
import Commercial from '../../components/cards/Tradesperson/Commercial';
import Industrial from '../../components/cards/Tradesperson/Industrial';
import Header from '../../components/text/Header';
import Rating from '../../components/cards/Tradesperson/Rating';
import Comment from '../../components/cards/Comment/Comment';
import SectionedContainer from '../../components/containers/SectionedContainer';
import Line from '../../components/common/Line';
import Touchable from '../../components/common/Touchable';
import { useSelector } from 'react-redux';

const TradespersonProfileScreen = props => {
    const tradespersonId =
        props.route.params && props.route.params.tradespersonId;

    const tradesperson = useSelector(state => state.tradesperson.all).find(
        elem => elem.userId === tradespersonId
    );

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'John McCormack',
            headerRight: headerRight,
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
                        props.navigation.navigate('Profile', {
                            screen: 'EditTradespersonProfile',
                            params: { id: null },
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
                    <ProfilePicture isLarge={true} />
                </Line>
                <Line>
                    <Occupations isOnProfileScreen={true} />
                </Line>
                <Line>
                    <Contact
                        iconColor={Color.importantTextOnTertiaryColorBackground}
                        showLabels={true}
                        containerStyle={styles.contactContainer}
                    />
                </Line>
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
                            <Location />
                            <SmallContent
                                style={{ color: Color.secondaryColor }}
                            >
                                {' '}
                                away
                            </SmallContent>
                        </View>
                        <View style={styles.details}>
                            <Experience style={{ paddingLeft: 0 }} />
                            <SmallContent
                                style={{ color: Color.secondaryColor }}
                            >
                                {' '}
                                experience
                            </SmallContent>
                        </View>
                    </View>
                    <View style={styles.column}>
                        <View style={styles.details}>
                            <CompletedJobs />
                        </View>
                        <View style={styles.details}>
                            <Insurance style={{ paddingLeft: 0 }} />
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        paddingTop:
                            Layout.screenHorizontalPadding -
                            Layout.generalPadding,
                    }}
                >
                    <Header style={{ textAlign: 'left' }}>Work types</Header>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingTop: Layout.generalPadding,
                    }}
                >
                    <View style={styles.column}>
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
                    </View>
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
                        Mo - Fr: 10 am - 8 pm, national holidays off
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
                        paddingBottom:
                            Layout.screenHorizontalPadding -
                            Layout.generalPadding,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Header style={{ textAlign: 'left' }}>Rating: </Header>
                    <Rating
                        rating={4.5}
                        color={Color.textColor}
                        readOnly={true}
                    />
                </View>

                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </View>
        );
    };

    return (
        <SectionedContainer
            //title="John McCormack"
            //titleColor={Color.importantTextOnTertiaryColorBackground}
            topComponent={<TopComponent />}
            midComponent={<MidComponent />}
            bottomComponent={<BottomComponent />}
            navigation={props.navigation}
        />
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
