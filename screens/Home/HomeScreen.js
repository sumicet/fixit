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

const HomeScreen = props => {
    const isFocused = useIsFocused();
    const allTradespeople = useSelector(state => state.tradespeople.all);
    const streetAddress = useSelector(state => state.auth.streetAddress);

    useEffect(() => {
        if (isFocused) {
            // TODO add notification
        }
    }, [props, isFocused]);

    return (
        <ScrollableContainer style={{ paddingHorizontal: 0 }}>
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
                        <Header style={{ textAlign: 'left', paddingBottom: 5 }}>
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
            <View style={{ paddingHorizontal: Layout.screenHorizontalPadding }}>
                <View
                    style={{
                        width: '100%',
                        marginBottom: Layout.screenHorizontalPadding,
                    }}
                >
                    <Header style={{ textAlign: 'left' }}>
                        Recommended tradespeople:
                    </Header>
                </View>
                <View style={{ flex: 1 }}>
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
                        renderItem={itemData => (
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
                        )}
                    />
                </View>
            </View>
            <View style={{ height: 100, width: '100%' }}></View>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
