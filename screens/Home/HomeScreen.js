import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import Container from '../../components/containers/Container';
import { showInAppNotification } from '../../components/notifications/InAppNotification';
import Color from '../../constants/Color';
import SearchBar from '../../components/search/SearchBar';
import Touchable from '../../components/common/Touchable';
import Header from '../../components/text/Header';
import Layout from '../../constants/Layout';

const HomeScreen = ({ route, navigation }) => {
    useEffect(() => {
        if (route.params && route.params.isInAppNotificationVisible) {
            showInAppNotification(
                'Your job has been posted.',
                'You can now search for a tradesperson. Click here to review your job.',
                () => {
                    navigation.navigate('MyJobs');
                },
                Color.success
            );
        }
    });

    return (
        <Container style={{ paddingTop: 0, paddingHorizontal: 0}}>
            <ScrollView
                style={{
                    paddingTop: Layout.screenVerticalPadding,
                    paddingHorizontal: Layout.screenHorizontalPadding,
                }}
            >
                <SearchBar />

                <View
                    style={{ width: '100%', marginBottom: Layout.cardMargin }}
                >
                    <Header style={{ textAlign: 'left' }}>
                        Rate previously hired tradespeople:
                    </Header>
                </View>

                <View style={{ flex: 0 }}>
                    <ScrollView horizontal>
                        <Touchable onPress={() => {}} style={{ flex: 0 }}>
                            <TradespersonCard isRateCard={true} />
                        </Touchable>
                        <Touchable
                            onPress={() => {}}
                            style={{
                                flex: 0,
                                marginHorizontal: Layout.generalMargin,
                            }}
                        >
                            <TradespersonCard isRateCard={true} />
                        </Touchable>
                        <Touchable onPress={() => {}} style={{ flex: 0 }}>
                            <TradespersonCard isRateCard={true} />
                        </Touchable>
                    </ScrollView>
                </View>

                <View
                    style={{ width: '100%', marginBottom: Layout.cardMargin }}
                >
                    <Header style={{ textAlign: 'left' }}>
                        Recommended tradespeople:
                    </Header>
                </View>
                <View style={{ flex: 1 }}>
                    <Touchable onPress={() => {}} style={{ flex: 0 }}>
                        <TradespersonCard />
                    </Touchable>
                    <Touchable onPress={() => {}} style={{ flex: 0 }}>
                        <TradespersonCard />
                    </Touchable>
                    <Touchable onPress={() => {}} style={{ flex: 0 }}>
                        <TradespersonCard />
                    </Touchable>
                </View>
                <View style={{height: 100, width: '100%'}}></View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
