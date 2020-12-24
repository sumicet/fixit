import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import Color from '../../constants/Color';
import SearchBar from '../../components/search/SearchBar';
import Header from '../../components/text/Header';
import Layout from '../../constants/Layout';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const HomeScreen = props => {
    const isFocused = useIsFocused();
    const allTradespeople = useSelector(state => state.tradespeople.all);

    useEffect(() => {
        if (isFocused) {
            // TODO add notification
        }
    }, [props, isFocused]);

    return (
        <ScrollableContainer>
            {/* <SearchBar /> */}

            {/* <View style={{ width: '100%', marginBottom: Layout.cardMargin }}>
                <Header style={{ textAlign: 'left' }}>
                    Rate previously hired tradespeople:
                </Header>
            </View> */}

            {/* <View style={{ flex: 0 }}>
                <ScrollView horizontal>
                    <TradespersonCard
                        isRateCard={true}
                        navigation={props.navigation}
                        tradespersonId="1p6PpA2vNhe6jZ4mfg4GZSLGhYz2"
                    />
                    <View
                        style={{
                            marginHorizontal: Layout.generalMargin,
                        }}
                    >
                        <TradespersonCard
                            isRateCard={true}
                            navigation={props.navigation}
                            tradespersonId="1p6PpA2vNhe6jZ4mfg4GZSLGhYz2"
                        />
                    </View>
                    <TradespersonCard
                        isRateCard={true}
                        navigation={props.navigation}
                        tradespersonId="1p6PpA2vNhe6jZ4mfg4GZSLGhYz2"
                    />
                </ScrollView>
            </View> */}

            <View style={{ width: '100%', marginBottom: Layout.screenHorizontalPadding }}>
                <Header style={{ textAlign: 'left' }}>
                    Recommended tradespeople:
                </Header>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={allTradespeople}
                    style={{ flex: 1 }}
                    keyExtractor={(item, i) => `key-${i}`}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{ height: Layout.screenHorizontalPadding }}
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
                            ratingVotesAmount={itemData.item.ratingVotesAmount}
                            recommendedByIds={itemData.item.recommendedByIds}
                            profilePicture={itemData.item.profilePicture}
                            phoneNumber={itemData.item.phoneNumber}
                        />
                    )}
                />
            </View>
            <View style={{ height: 100, width: '100%' }}></View>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
