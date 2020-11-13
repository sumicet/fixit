import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import QuizScreen from '../../components/containers/QuizScreen';
import Layout from '../../constants/Layout';
import Details from '../../components/myjobs/Details';
import Header from '../../components/text/Header';
import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import Color from '../../constants/Color';
import { useSelector } from 'react-redux';
import PropertyTypesScreen from '../Quiz/PropertyTypesScreen';

const JobDetailsScreen = (props) => {
    const job = useSelector(state => state.job.userPendingJobs).find(
        elem => elem.id === props.route.params.id
    ); // TODO only works for customer

    return (
        <View style={{ backgroundColor: Color.primaryColor }}>
            <ScrollView style={{ marginTop: Layout.screenTopMargin }}>
                <QuizScreen
                    title="Details"
                    centerTitle={true}
                    style={{
                        paddingHorizontal: Layout.screenHorizontalPadding,
                        marginTop: 0,
                    }}
                >
                    <Details job={job} navigation={props.navigation} />
                    <View style={{ marginVertical: Layout.generalMargin }}>
                        <Header style={{ textAlign: 'left' }}>Quotes:</Header>
                    </View>
                    <TradespersonCard hasQuote={true} quote="200£" />
                    <TradespersonCard hasQuote={true} quote="320£" />
                    <TradespersonCard hasQuote={true} quote="190£" />
                </QuizScreen>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({});

export default JobDetailsScreen;
