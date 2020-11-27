import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TitledScrollableContainer from '../../components/containers/TitledScrollableContainer';
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
import { setStatusBarStyle } from '../../store/actions/ui';

const ProfileScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(
                setStatusBarStyle('light-content', Color.specialTextField)
            );
            console.log('loaded');
        });

        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            dispatch(setStatusBarStyle('dark-content', Color.primaryColor));
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <TitledScrollableContainer
            title="John McCormack"
            titleColor={Color.primaryBrandColor}
            backgroundColor={Color.specialTextField}
        >
            <View style={{ backgroundColor: Color.textField }}>
                <View style={styles.topContainer}>
                    <View style={styles.line}>
                        <ProfilePicture isLarge={true} />
                    </View>
                    <View style={styles.line}>
                        <Occupations isOnProfileScreen={true} />
                    </View>
                    <View style={styles.line}>
                        <Contact
                            showLabels={true}
                            containerStyle={styles.contactContainer}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.midContainer}>
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
            </View>
            <View style={styles.bottomContainer}>
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
                        <Rating rating={4.5} />
                    </View>

                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </View>
            </View>
        </TitledScrollableContainer>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: Color.specialTextField,
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

export default ProfileScreen;
