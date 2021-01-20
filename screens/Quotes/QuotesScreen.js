import React from 'react';
import { View, StyleSheet } from 'react-native';
import MediumButton from '../../components/buttons/MediumButtom';
import Line from '../../components/common/Line';
import Container from '../../components/containers/Container';
import Empty from '../../components/empty/Empty';
import QuoteCard from '../../components/quotes/QuoteCard';
import Color from '../../constants/Color';

const QuotesScreen = props => {
    return (
        <Container style={{paddingTop: 0, marginTop: 0}}>
            <QuoteCard />
        </Container>
    );
};

const styles = StyleSheet.create({});

export default QuotesScreen;
