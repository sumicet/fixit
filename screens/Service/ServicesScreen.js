import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import QuizScreen from '../../components/containers/QuizScreen';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import ServiceCard from '../../components/cards/ServiceCard';
import Alert from '../../components/alert/Alert';

const ServicesScreen = props => {

    const [modalVisible, setModalVisible] = useState(false);
    const [service, setService] = useState({
        title: '',
        color: ''
    });

    const showAlert = () => {
        setModalVisible(true);
    };

    const handleHideAlert = () => {
        setModalVisible(false);
    };

    const onDeleteConfirm = () => {
        handleHideAlert();
    };

    const handleServiceCardPress = (title, color) => {
        setService({
            title: title,
            color: color
        })
        showAlert();

    }

    return (
        <QuizScreen title="Services" centerTitle={true}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: Layout.screenHorizontalPadding,
                }}
            >
                <ServiceCard
                    title="Premium Fixit"
                    perkOne="unlimited quotes"
                    perkTwo="receive and offer recommendations"
                    price='10$ / month'
                    color={Color.premiumFixit}
                    onPress={() => handleServiceCardPress("Premium Fixit", "#ec42ff")}
                    style={{ paddingBottom: Layout.screenHorizontalPadding }}
                />
                <ServiceCard
                    title="Bump"
                    perkOne="add me to the recommended list for 24 hours"
                    perkTwo="highlight my card"
                    price='20$'
                    color={Color.bump}
                    onPress={() => handleServiceCardPress("Bump", "#42cdff")}
                    style={{ paddingBottom: Layout.screenHorizontalPadding }}
                />
            </View>
            <Alert
                modalVisible={modalVisible}
                onPress={() => {}}
                hide={handleHideAlert}
                title={service.title}
                titleColor={service.color}
                buttonColor={service.color}
                cancelButtonColor={Color.tertiaryBrandColor}
                message="Would you like to purchase this service?"
            />
        </QuizScreen>
    );
};

const styles = StyleSheet.create({});

export default ServicesScreen;
