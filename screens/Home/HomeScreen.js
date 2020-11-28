import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import Color from '../../constants/Color';
import SearchBar from '../../components/search/SearchBar';
import Header from '../../components/text/Header';
import Layout from '../../constants/Layout';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import showInAppNotification from '../../components/notifications/InAppNotification';

const HomeScreen = (props) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            console.log('created'); // TODO add notification
        }
    }, [props, isFocused]);

    return (
        <ScrollableContainer>
            <SearchBar />

            <View style={{ width: '100%', marginBottom: Layout.cardMargin }}>
                <Header style={{ textAlign: 'left' }}>
                    Rate previously hired tradespeople:
                </Header>
            </View>

            <View style={{ flex: 0 }}>
                <ScrollView horizontal>
                    <TradespersonCard
                        isRateCard={true}
                        navigation={props.navigation}
                    />
                    <View
                        style={{
                            marginHorizontal: Layout.generalMargin,
                        }}
                    >
                        <TradespersonCard
                            isRateCard={true}
                            navigation={props.navigation}
                        />
                    </View>
                    <TradespersonCard
                        isRateCard={true}
                        navigation={props.navigation}
                    />
                </ScrollView>
            </View>

            <View style={{ width: '100%', marginBottom: Layout.cardMargin }}>
                <Header style={{ textAlign: 'left' }}>
                    Recommended tradespeople:
                </Header>
            </View>
            <View style={{ flex: 1 }}>
                <TradespersonCard navigation={props.navigation} />

                <TradespersonCard navigation={props.navigation} />

                <TradespersonCard navigation={props.navigation} />
            </View>
            <View style={{ height: 100, width: '100%' }}></View>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
