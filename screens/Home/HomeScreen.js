import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';

import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import Container from '../../components/containers/Container';
import { showInAppNotification } from '../../components/notifications/InAppNotification';
import Color from '../../constants/Color';
import SearchBar from '../../components/search/SearchBar';
import Touchable from '../../components/common/Touchable';
import Header from '../../components/text/Header';
import Layout from '../../constants/Layout';
import PropertyTypesScreen from '../Quiz/PropertyTypesScreen';
import ScrollableContainer from '../../components/containers/ScrollableContainer';

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
        <ScrollableContainer>
            <StatusBar barStyle='dark-content' backgroundColor={Color.primaryColor} />
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
                        navigation={navigation}
                    />
                    <View
                        style={{
                            marginHorizontal: Layout.generalMargin,
                        }}
                    >
                        <TradespersonCard
                            isRateCard={true}
                            navigation={navigation}
                        />
                    </View>
                    <TradespersonCard
                        isRateCard={true}
                        navigation={navigation}
                    />
                </ScrollView>
            </View>

            <View style={{ width: '100%', marginBottom: Layout.cardMargin }}>
                <Header style={{ textAlign: 'left' }}>
                    Recommended tradespeople:
                </Header>
            </View>
            <View style={{ flex: 1 }}>
                <TradespersonCard navigation={navigation} />

                <TradespersonCard navigation={navigation} />

                <TradespersonCard navigation={navigation} />
            </View>
            <View style={{ height: 100, width: '100%' }}></View>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
