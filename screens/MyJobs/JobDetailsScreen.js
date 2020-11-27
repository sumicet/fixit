import React from 'react';
import { View, StyleSheet } from 'react-native';

import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import Details from '../../components/myjobs/Details';
import Header from '../../components/text/Header';
import TradespersonCard from '../../components/cards/Tradesperson/TradespersonCard';
import { useSelector } from 'react-redux';
import TitledScrollableContent from '../../components/containers/TitledScrollableContainer';

const JobDetailsScreen = props => {
    const job = useSelector(state => state.job.userPendingJobs).find(
        elem => elem.id === props.route.params.id
    ); // TODO only works for customer

    return (
        <TitledScrollableContent
            title="Details"
            titleColor={Color.primaryBrandColor}
            backgroundColor={Color.textField}
        >
            <View style={styles.container}>
                <View style={styles.detailsContainer}>
                    <Details job={job} navigation={props.navigation} />
                </View>
                <View
                    style={{
                        paddingHorizontal: Layout.screenHorizontalPadding,
                    }}
                >
                    <View style={{ marginVertical: Layout.generalMargin }}>
                        <Header style={{ textAlign: 'left' }}>Quotes:</Header>
                    </View>
                    <TradespersonCard hasQuote={true} quote="200£" />
                    <TradespersonCard hasQuote={true} quote="320£" />
                    <TradespersonCard hasQuote={true} quote="190£" />
                </View>
            </View>
        </TitledScrollableContent>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.primaryColor,
    },
    detailsContainer: {
        backgroundColor: Color.textField,
        paddingHorizontal: Layout.screenHorizontalPadding,
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius,
    },
});

export default JobDetailsScreen;
