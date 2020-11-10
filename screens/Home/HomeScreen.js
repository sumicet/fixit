import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TradespersonCard from '../../components/cards/TradespersonCard';
import Container from '../../components/containers/Container';
import { showInAppNotification } from '../../components/notifications/InAppNotification';
import Color from '../../constants/Color';

const HomeScreen = ({ route, navigation }) => {

    useEffect(() => {
        console.log('hey')
        if(route.params && route.params.isInAppNotificationVisible) {
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
        <Container>
            <View style={{flex: 1}}>
                <TradespersonCard />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
