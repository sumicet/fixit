import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import Color from '../../constants/Color';
import SearchBar from '../../components/search/SearchBar';
import Header from '../../components/text/Header';
import Layout from '../../constants/Layout';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import GoogleLocation from '../../assets/icons/User/GoogleLocationIcon';
import Line from '../../components/common/Line';
import Touchable from '../../components/common/Touchable';
import HeaderWithEllipsis from '../../components/text/HeaderWithEllipsis';
import LineDescription from '../../components/common/LineDescription';
import JobList from '../../components/cards/Job/JobList';
import EndOfPageSpace from '../../components/layout/EndOfPageSpace';
import Container from '../../components/containers/Container';

const HomeScreen = props => {
    const isFocused = useIsFocused();
    const userType = useSelector(state => state.auth.userType);
    const allTradespeople = useSelector(state => state.tradespeople.all);
    const allJobs = useSelector(state => state.job.allJobs);
    const streetAddress = useSelector(state => state.auth.streetAddress);

    useEffect(() => {
        if (isFocused) {
            // TODO add notification
        }
    }, [props, isFocused]);

    const CurrentLocation = () => {
        return (
            <Line
                style={{
                    flex: 0,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: Layout.generalPadding,
                }}
            >
                <View>
                    {/* <LocationIcon size={Layout.menuIconSize} /> */}
                    <GoogleLocation />
                </View>
                <Touchable
                    style={{
                        flexDirection: 'row',
                        backgroundColor: Color.textField,
                        padding: Layout.generalPadding,
                        borderRadius: Layout.borderRadius,
                        flex: 1,
                        marginLeft: Layout.generalPadding,
                    }}
                    onPress={() => {
                        props.navigation.navigate('HomeStackWithoutSearchBar', {
                            screen: 'CurrentLocation',
                        });
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Header
                            style={{
                                textAlign: 'left',
                                paddingBottom: 5,
                            }}
                        >
                            Where will the job be?
                        </Header>
                        <HeaderWithEllipsis
                            style={{
                                fontFamily: 'Regular',
                                color: Color.primaryBrandColor,
                            }}
                        >
                            {streetAddress && streetAddress.line1}
                        </HeaderWithEllipsis>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: Layout.generalPadding,
                        }}
                    >
                        <Icon
                            name="right"
                            size={Layout.menuIconSize}
                            color={Color.secondaryColor}
                        />
                    </View>
                </Touchable>
            </Line>
        );
    };

    return (
        <Container
            style={{ paddingHorizontal: 0, paddingTop: 0, marginTop: 0 }}
        >
            {userType === 'tradesperson' ? (
                <FlatList
                    data={allTradespeople.filter(tp => tp.occupationsIds)}
                    style={{ flex: 1 }}
                    keyExtractor={(item, i) => `key-${i}`}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                height: Layout.screenHorizontalPadding,
                            }}
                        ></View>
                    )}
                    ListHeaderComponent={() => (
                        <View>
                            <CurrentLocation />
                            <LineDescription
                                style={{
                                    paddingHorizontal:
                                        Layout.screenHorizontalPadding,
                                }}
                                text="Recommended tradespeople"
                            />
                        </View>
                    )}
                    ListFooterComponent={() => <EndOfPageSpace />}
                    renderItem={itemData => (
                        <View
                            style={{
                                paddingHorizontal:
                                    Layout.screenHorizontalPadding,
                            }}
                        >
                            <TradespersonCard
                                navigation={props.navigation}
                                userId={itemData.item.userId}
                                name={itemData.item.name}
                                occupationsIds={itemData.item.occupationsIds}
                                streetAddress={itemData.item.streetAddress}
                                experienceId={itemData.item.experienceId}
                                insurance={itemData.item.insurance}
                                rating={itemData.item.rating}
                                ratingVotesAmount={
                                    itemData.item.ratingVotesAmount
                                }
                                recommendedByIds={
                                    itemData.item.recommendedByIds
                                }
                                profilePicture={itemData.item.profilePicture}
                                phoneNumber={itemData.item.phoneNumber}
                            />
                        </View>
                    )}
                />
            ) : (
                <JobList list={allJobs} navigation={props.navigation} />
            )}
        </Container>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
